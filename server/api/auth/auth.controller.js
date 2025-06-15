const { Admin, User, Order, Item } = require("../../models");
const { clerkClient } = require("@clerk/clerk-sdk-node");

const { getAuth } = require('@clerk/express');
const { users } = require('@clerk/clerk-sdk-node');

const check = async (req, res) => {
  const { UserEmail, Collegename, UserName, College_id } = req.body;

  try {
    // Check if admin with same email or college ID already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email: UserEmail }, { college_id: College_id }],
    });
    const existingUser = await User.findOne({
      $or: [{ email: UserEmail }, { college_id: College_id }],
    });
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
  const { userId, UserEmail, Collegename, UserName, College_id } = req.body;
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
  const { userId, UserName, UserEmail, College_id } = req.body;

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
  const { items, totalAmount, gmailAccount } = req.body;
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

    if (user_id && college_id) {
      const addOrder_res = await Order.insertOne({
        user_id: user_id,
        college_id: college_id.college_id,
        items: items,
        totalAmount: totalAmount,
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
    }
  } catch (error) {
    console.log(error);
  }
};

const displayOrder = async (req, res) => {
  try {
    const { gmailAccount } = req.body;
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
  }
};

const browseOrder = async (req, res) => {
  const { gmailAccount } = req.body;
  try {
    const college_id = await User.findOne(
      {
        email: gmailAccount,
      },
      {
        college_id: 1,
      }
    );
    const items = await Item.find({
      college_id: college_id.college_id,
    });
    console.log(college_id.college_id);
    if (college_id && items.length > 0) {
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
  }
};

const deleteAccount = async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await users.getUser(userId);

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  );
  const user_email = primaryEmail?.emailAddress; //Get Registered User_Email from clerk
  
  try {
    await clerkClient.users.deleteUser(userId); //Delete the user data from clerk
    await User.deleteOne({ email: user_email}); //Delete the user data from DB
    
    return res.status(200).json({ status: 'deleted', message: "Account deleted successfully" });
  }catch(err){
    console.error("Error deleting user:", err);
    return res.status(500).json({ status: 'error', message: "Internal Server Error" });
  }


}

module.exports = {
  check,
  addAdmin,
  addUser,
  addOrder,
  displayOrder,
  browseOrder,
  deleteAccount
};
