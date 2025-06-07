// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const Admin = require("./models/Admin.model"); // Admin model
const connectDB = require("./utils/db"); // MongoDB connection function

connectDB(); // Connect to MongoDB

// Middleware to parse incoming JSON and enable CORS
app.use(express.json());
app.use(cors());

// Start server on port 3001
app.listen(3001, () => {
  console.log("Server up and running...");
});

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Hello from Baba Express");
});

// Route to handle admin registration
app.post("/register", async (req, res) => {
  const { UserEmail, Collegename, UserName, College_id } = req.body;

  try {
    // Check if admin with same email or college ID already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email: UserEmail }, { college_id: College_id }],
    });

    if (existingAdmin) {
      return res.json({ exists: true, message: "Admin already exists" });
    } else {
      // Insert new admin into database
      const newAdmin = await Admin.insertOne({
        college_name: Collegename,
        college_id: College_id,
        email: UserEmail,
      });

      return res.json({
        success: true,
        message: "New admin inserted",
        admin: newAdmin,
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});
