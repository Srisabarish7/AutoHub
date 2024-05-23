const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const adminRoutes = require('./router/adminRoutes');

dotenv.config({ path: './config.env' });

// Database connection
require('./database/conn');
const User = require('./models/userSchema');


// Import Admin model
const Admin = require('./models/adminSchema');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(require('./router/auth'));
// Import admin routes
app.use('/api/admin', adminRoutes);
app.use("/uploads", express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send(`Home page`);
});

// app.get('/about', middleware, (req, res) =>{
//     res.send(`About page`);
// });

app.get('/contact', (req, res) =>{
    res.send(`Contact page`);
});

app.get('/signin', (req, res) =>{
    res.send(`Signin page`);
});

app.get('/signup', (req, res) =>{
    res.send(`Signup Page`);
});

app.get('/signinAdmin',(req,res)=>{
    res.send(`Signin page`);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Route to handle new admin account creation
app.post('/api/admin/create', async (req, res) => {
    try {
        const { adminName, email, phone, adminPassword, cPassword } = req.body;

        // Check if admin already exists with the provided email
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        // Check if passwords match
        if (adminPassword !== cPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create new admin instance
        const admin = new Admin({ adminName, email, phone, adminPassword, cPassword });

        // Save admin to database
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
