const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');

// User Registration
router.post('/signup', async (req, res) => {
    const { name, phone, email, password, cPassword } = req.body;
    
    // Check if any required fields are missing
    if (!name || !phone || !email || !password || !cPassword) {
        return res.status(422).json({ error: "Please fill all the fields properly" });
    }

    try {
        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "User already exists with this email" });
        }

        // Check if passwords match
        if (password !== cPassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        // Create new user
        const user = new User({ name, phone, email, password, cPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
