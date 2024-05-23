const Admin = require('../models/adminSchema');

// Function to create a new admin account
exports.createAdmin = async (req, res) => {
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
};
