// db.js

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Ensure this is set for deprecation warnings
      useFindAndModify: false, // Ensure this is set for deprecation warnings
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
