const { Admin, User } = require("../../models");
const { clerkClient } = require("@clerk/clerk-sdk-node");

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
  const checkCollege_id_exits = await Admin.findOne({
    college_id: College_id,
  });
  if (!checkCollege_id_exits) {
    res.json({
      college_id_exists: false,
      message: "College Id does not exists",
    });
  } else {
    try {
      // Use insertOne via Mongoose's collection API
      const result = await User.insertOne({
        name: UserName,
        email: UserEmail,
        college_id: College_id,
      });

      // Check if insertion was successful
      if (result) {
        try {
          await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
              college_id: College_id,
              role: "student",
            },
          });
          res.status(201).json({
            success: true,
            message: "User registered successfully",
            insertedId: result.insertedId,
          });
        } catch (err) {
          console.error("Failed to update user role:", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to update user role" });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "User insertion failed",
        });
      }
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({
        success: false,
        message: "Server error while inserting user",
        error: error.message,
      });
    }
  }
};

// const setRole = (req, res) => {
//   const allowedRoles = ["admin", "student"];
//   const { userId, role } = req.body;

//   if (!allowedRoles.includes(role)) {
//     return res.status(400).json({ success: false, message: "Invalid role" });
//   }

//   try {
//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: {
//         role,
//       },
//     });

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Failed to update user role:", err);
//     return res.status(500).json({ success: false });
//   }
// }

module.exports = {
  check,
  addAdmin,
  addUser,
};
