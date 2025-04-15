require('dotenv').config()
const express = require('express');
const connectDB = require('./src/Config/db');  
const cookiePArser = require('cookie-parser')


// Routes
const GymRoute = require('./src/Routes/gym');  
const MemberShipRoutes = require('./src/Routes/Membership')
const MemberRoute = require("./src/Routes/member")

const app = express();

// Middleware to parse incoming JSON requests
app.use(cookiePArser())
app.use(express.json());


app.use('/auth', GymRoute); 
app.use("/plans",MemberShipRoutes)
app.use("/member",MemberRoute) 

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

