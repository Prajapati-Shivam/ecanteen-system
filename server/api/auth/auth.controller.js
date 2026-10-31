const { Admin, User, Order, Item } = require("../../models");
const { clerkClient } = require("@clerk/clerk-sdk-node");

const { Cashfree, CFEnvironment } = require("cashfree-pg");
require("dotenv").config();
const crypto = require("crypto");

// All handlers run behind requireUser, which sets req.clerkUser and req.userEmail
// from the verified Clerk session token.

const getFullName = (user) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ");

// Registration endpoints must not let an already-registered user switch role/college
const alreadyRegistered = (req) => Boolean(req.clerkUser.publicMetadata?.role);

const check = async (req, res) => {
  const UserEmail = req.userEmail;
  if (!UserEmail) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    // Match on email only: an undefined college_id inside $or is cast to {}
    // and would match every document.
    const existingAdmin = await Admin.findOne({ email: UserEmail });
    const existingUser = await User.findOne({ email: UserEmail });
    if (existingAdmin) {
      //This means email exits
      return res.json({
        exists_admin: true,
        message: "Account already exists as a Admin",
      });
    } else if (existingUser) {
      return res.json({
        exists_user: true,
        message: "Account already exists as a Student/User",
      });
    } else {
      //This means email doesn't exist

      return res.json({
        exists: false,
        message: "First Login In",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const addAdmin = async (req, res) => {
  const { Collegename, College_id } = req.body;
  const userId = req.clerkUser.id;
  const UserEmail = req.userEmail;

  if (alreadyRegistered(req)) {
    return res
      .status(409)
      .json({ success: false, message: "Account already registered" });
  }
  if (!Collegename || !College_id || !UserEmail) {
    return res
      .status(400)
      .json({ success: false, message: "College name and email are required" });
  }

  try {
    // Use insertOne on the underlying MongoDB collection
    const result = await Admin.insertOne({
      college_name: Collegename,
      college_id: College_id,
      email: UserEmail,
    });

    if (result) {
      try {
        await clerkClient.users.updateUserMetadata(userId, {
          publicMetadata: {
            college_id: College_id,
            role: "admin",
          },
        });
        res
          .status(201)
          .json({ success: true, message: "Admin registered successfully" });
      } catch (err) {
        console.error("Failed to update user role:", err);
        res
          .status(500)
          .json({ success: false, message: "Failed to update user role" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Insertion not acknowledged" });
    }
  } catch (err) {
    console.error("Error inserting admin:", err);
    res.status(500).json({
      success: false,
      message: "Failed to insert admin data",
      error: err.message,
    });
  }
};

const addUser = async (req, res) => {
  const { College_id } = req.body;
  const userId = req.clerkUser.id;
  const UserName = getFullName(req.clerkUser) || req.userEmail;
  const UserEmail = req.userEmail;

  if (alreadyRegistered(req)) {
    return res
      .status(409)
      .json({ success: false, message: "Account already registered" });
  }
  // An undefined College_id would be cast to {} and match any admin
  if (!College_id || !UserEmail) {
    return res
      .status(400)
      .json({ success: false, message: "College ID and email are required" });
  }

  try {
    const checkCollege_id_exits = await Admin.findOne({
      college_id: College_id,
    });

    if (!checkCollege_id_exits) {
      return res.json({
        college_id_exists: false,
        message: "College Id does not exist",
      });
    }

    // Create user document using Mongoose
    const newUser = await User.create({
      name: UserName,
      email: UserEmail,
      college_id: College_id,
    });

    // Update Clerk metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        college_id: College_id,
        role: "student",
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      insertedId: newUser._id,
    });
  } catch (error) {
    console.error("Error in addUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

//after clicking checkout
const addOrder = async (req, res) => {
  const { items, totalAmount, order_id } = req.body;
  const gmailAccount = req.userEmail;
  if (!gmailAccount) {
    return res.status(400).json({ status: false, message: "Email is required" });
  }
  try {
    const user_id = await User.findOne(
      {
        email: gmailAccount,
      },
      { _id: 1 }
    );
    const college_id = await User.findOne(
      {
        email: gmailAccount,
      },
      {
        college_id: 1,
      }
    );

    if (!user_id || !college_id) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (!order_id) {
      return res.status(400).json({
        status: false,
        message: "Payment order ID is required",
      });
    }

    // Verify with Cashfree that this order was actually paid for the same amount
    const { data: paymentOrder } = await cashfree.PGFetchOrder(order_id);
    if (
      paymentOrder?.order_status !== "PAID" ||
      Number(paymentOrder.order_amount) !== Number(totalAmount)
    ) {
      return res.status(402).json({
        status: false,
        message: "Payment not completed",
      });
    }

    const addOrder_res = await Order.insertOne({
      user_id: user_id,
      college_id: college_id.college_id,
      items: items,
      totalAmount: totalAmount,
      paymentStatus: "paid",
    });
    if (addOrder_res) {
      res.status(200).json({
        status: true,
        message: "Order has been placed",
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Order has not been placed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Order has not been placed",
    });
  }
};

const displayOrder = async (req, res) => {
  try {
    const gmailAccount = req.userEmail;
    if (!gmailAccount) {
      return res.status(400).json({ orders: [], message: "Email is required" });
    }
    const user_id = await User.findOne(
      {
        email: gmailAccount,
      },
      {
        user_id: 1,
      }
    );
    const orders = await Order.find({
      user_id: user_id,
    });
    if (user_id && orders.length > 0) {
      // console.log(orders);
      res.status(200).json({
        orders: orders,
      });
    } else {
      res.json({
        orders: orders,
        message: "Sorry no orders for " + gmailAccount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ orders: [], message: "Error fetching orders" });
  }
};

const browseOrder = async (req, res) => {
  const gmailAccount = req.userEmail;
  try {
    const college_id = gmailAccount
      ? await User.findOne(
          {
            email: gmailAccount,
          },
          {
            college_id: 1,
          }
        )
      : null;
    if (!college_id) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const items = await Item.find({
      college_id: college_id.college_id,
    });
    if (items.length > 0) {
      res.status(200).json({
        success: true,
        items: items,
      });
    } else {
      res.json({
        success: false,
        message: "No items found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching items",
    });
  }
};

const deleteAccount = async (req, res) => {
  const user = req.clerkUser;
  const userId = user.id;
  const user_email = req.userEmail; //Registered User_Email from clerk

  try {
    await clerkClient.users.deleteUser(userId); //Delete the user data from clerk
    // Without an email the filter would be cast to {} and delete an arbitrary document
    if (user_email) {
      if(user.publicMetadata.role == 'admin')
        await Admin.deleteOne({ email: user_email }); //Delete the user data from DB
      else
        await User.deleteOne({ email: user_email }); //Delete the user data from DB
    }

    return res
      .status(200)
      .json({ status: "deleted", message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(uniqueId).digest("hex");
  return hash.substring(0, 12);
}
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX, // or CFEnvironment.PRODUCTION
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);
const payment = async (req, res) => {
  const { totalPrice } = req.body;
  const gmailAccount = req.userEmail;
  const Name = getFullName(req.clerkUser) || gmailAccount;
  try {
    const orderId = generateOrderId();
    const order = {
      order_id: orderId,
      order_amount: totalPrice,
      order_currency: "INR",
      customer_details: {
        customer_id: "123",
        customer_name: Name,
        customer_email: gmailAccount,
        customer_phone: "1111111111",
      },
    };

    const { data } = await cashfree.PGCreateOrder(order);
    // return both session and order_id to frontend
    res.json({
      payment_session_id: data.payment_session_id,
      order_id: orderId,
    });
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  check,
  addAdmin,
  addUser,
  addOrder,
  displayOrder,
  browseOrder,
  deleteAccount,
  payment,
};
