// src/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Success logging
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    // Error handling
    console.error(`❌ Error: ${error.message}`);
    // Exit process with failure
    process.exit(1); 
  }
};

module.exports = connectDB;