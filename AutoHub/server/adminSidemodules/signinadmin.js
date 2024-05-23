const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../models/adminSchema');
const { Console } = require('console');

// Admin Signin
router.post('/signinAdmin', async (req, res) => {
    try {
        const { adminName, adminPassword } = req.body;

        if (!adminName || !adminPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Find admin by adminName
        const admin = await Admin.findOne({ adminName });

        // Check if admin exists and verify password
        if (admin) {
            const isSame = await bcrypt.compare(adminPassword, admin.adminPassword);

            if (isSame) {
                // Generate JWT token
                const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY);
                console.log(token);
                // Set cookie with JWT token
                res.cookie("jwtAdmin", token, {
                    expires: new Date(Date.now() + 25892000000), // Expires in 1 year
                    httpOnly: true,
                    sameSite: 'None', // Set SameSite attribute to None
                    secure: true // Requires HTTPS
                });
                return res.json({ message: "Admin signed in successfully" });
                
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ error: "Admin not found" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
