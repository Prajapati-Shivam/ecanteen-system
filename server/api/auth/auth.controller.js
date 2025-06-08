const { Admin, User } = require("../../models");

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
    if (existingAdmin || existingUser) {
      //This means email exits
      return res.json({
        exists: true,
        message: "Account already exists\n either as Student or Admin",
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
  const { UserEmail, Collegename, UserName, College_id } = req.body;
  try {
    // Use insertOne on the underlying MongoDB collection
    const result = await Admin.insertOne({
      college_name: Collegename,
      college_id: College_id,
      email: UserEmail,
    });

    if (result) {
      res
        .status(201)
        .json({ success: true, message: "Admin registered successfully" });
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
  const { UserName, UserEmail, College_id } = req.body;
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
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          insertedId: result.insertedId,
        });
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

module.exports = {
  check,
  addAdmin,
  addUser,
};