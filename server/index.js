// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api'); // API routes
const connectDB = require('./utils/db'); // MongoDB connection

const app = express();
connectDB(); // Connect to MongoDB

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173', // Dev
  'https://ecanteen-system.vercel.app', // Vercel frontend
  'https://mealmate-murex.vercel.app/',
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., curl or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Optional: Basic health check route
app.get('/test', (req, res) => {
  res.send('Server Running');
});

// Use API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
