// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const apiRoutes = require('./api'); // API routes

const connectDB = require('./utils/db'); // MongoDB connection function
connectDB(); // Connect to MongoDB

// Middleware to parse incoming JSON and enable CORS
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://ecanteen-system.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use('/api', apiRoutes); // Use API routes

// Start server on port 3001
app.listen(3001, () => {
  console.log('Server up and running...');
});

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello from Baba Express');
});
