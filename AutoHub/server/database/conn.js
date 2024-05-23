const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Default to port 3000 if PORT is not defined in the environment

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
// Routes and other middleware setup goes here
mongoose.set('bufferTimeoutMS', 30000); // Increase buffer timeout to 30 seconds


