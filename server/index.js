require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Admin = require("./models/Admin.model");

const connectDB = require("./utils/db");
connectDB();

//Test connection to MongoDB
// const { User } = require("./models");
// User.create({
//   name: "Baba",
//   email: "fdf",
//   college_id: "1234",
// })
// .then((m) => m.save());

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("Server up and running...");
});

app.get("/", (req, res) => {
  res.send("Hello from Baba Express");
});

app.post("/loginD", async (req, res) => {
  const { UserEmail, Collegename, UserName, College_id } = req.body;

  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email: UserEmail }, { college_id: College_id }],
    });

    if (existingAdmin) {
      return res.json({ exists: true, message: "Admin already exists" });
    } else {
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
