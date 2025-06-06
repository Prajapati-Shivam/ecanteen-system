require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

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

app.post("/loginD", (req, res) => {
  const name = req.body.UserName;
  res.send(name + " We did it!!!");
});
