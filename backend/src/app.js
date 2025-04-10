// app.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware (optional)
app.use(express.json());

// Replace this with your MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/PERSONAL_DB';

mongoose.connect(MONGO_URI, )
.then(() => {
    console.log('MongoDB Connected');
    
    // Start server after DB connection
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
