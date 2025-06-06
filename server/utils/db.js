const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || 'test';

  try {
    await mongoose.connect(uri, {
      dbName,
    });

    console.log('[MongoDB] - Connected to database');
  } catch (err) {
    console.error(`[MongoDB] Connection error:`, err);
  }
};

module.exports = connectDB;
