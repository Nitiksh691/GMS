require('dotenv').config();
const express = require('express');
const connectDB = require('./src/Config/db');  
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
const authRoutes = require('./src/Routes/gym');  // This contains your login route
const MemberShipRoutes = require('./src/Routes/Membership');
const MemberRoute = require("./src/Routes/member");

// Make sure this matches what you're calling from frontend
app.use('/auth', authRoutes); 
app.use("/plans", MemberShipRoutes);
app.use("/member", MemberRoute);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});