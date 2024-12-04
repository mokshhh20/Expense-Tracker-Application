const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', false);
// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove useFindAndModify option
});

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT);
});
