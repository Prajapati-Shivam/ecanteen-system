// server/index.js or server.js
require('dotenv').config();
const pathModule = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://ecanteen-system.vercel.app',
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps or curl)
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

// Parse JSON body
app.use(express.json());

// Handle preflight requests globally
app.options(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use('/api', require('./api'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
