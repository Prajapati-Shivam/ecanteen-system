// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const apiRoutes = require("./api"); // API routes

const connectDB = require("./utils/db"); // MongoDB connection function
connectDB(); // Connect to MongoDB

// Middleware to parse incoming JSON and enable CORS
app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes); // Use API routes

// Start server on port 3001
app.listen(3001, () => {
  console.log("Server up and running...");
});

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Hello from Baba Express");
});
