// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');

// Route to create a new admin account
router.post('/create', async (req, res) => {
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

        // Hash the admin password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create new admin instance with hashed password
        const admin = new Admin({ adminName, email, phone, adminPassword: hashedPassword, cPassword });

        // Save admin to database
        await admin.save();

        const token = jwt.sign({ adminName: req.body.adminName }, process.env.SECRET_KEY);
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to sign in an admin
router.post('/signinAdmin', async (req, res) => {
    try {
        const { adminName, adminPassword } = req.body;

        // Find admin by adminName
        const admin = await Admin.findOne({ adminName });

        // Check if admin exists and verify password
        if (admin && await bcrypt.compare(adminPassword, admin.adminPassword)) {
            // Generate JWT token
            const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY);

            res.status(200).json({ message: 'Admin authenticated successfully', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
