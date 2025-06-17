// Load environment variables from .env file
require('dotenv').config();
const pathModule  = require('path');

const express = require('express');
const app = express();
const cors = require('cors');

const apiRoutes = require('./api'); // API routes

const connectDB = require('./utils/db'); // MongoDB connection function
connectDB(); // Connect to MongoDB

// Middleware to parse incoming JSON and enable CORS
app.use(express.json());

// Basic route to test server
app.get('/test', (req, res) => {
  res.send('Server Running');
});

app.use('/api', apiRoutes); // Use API routes

app.use(express.static(pathModule .join(__dirname, '../client/dist')));
app.get('/*\w', (req, res) => {
  res.sendFile(pathModule .resolve(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server up and running...');
});

