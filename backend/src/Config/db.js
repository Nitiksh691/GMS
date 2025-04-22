// config/db.js
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb://localhost:27017/GMS';
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
