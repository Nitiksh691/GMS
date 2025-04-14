require('dotenv').config()
const express = require('express');
const GymRoute = require('./src/Routes/gym');  // Ensure correct path
const connectDB = require('./src/Config/db');  // Ensure correct path
const cookiePArser = require('cookie-parser')




const app = express();

// Middleware to parse incoming JSON requests
app.use(cookiePArser())
app.use(express.json());

// Use the gym route with prefix /auth
app.use('/auth', GymRoute);  // This will make /auth/register route work

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

