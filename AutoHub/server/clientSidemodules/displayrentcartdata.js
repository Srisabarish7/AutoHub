const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const Rental = require('../models/rentalschema');
const RentVehicle = require('../models/rentvehicleSchema'); 

router.get('/getRentData', authenticate, async (req, res) => {
    try {
        const rentData = await Rental.find({ userId: req.userID }).lean(); 
        const promises = rentData.map(async (rental) => {
            const vehicle = await RentVehicle.findById(rental.vehicleId);
            return { ...rental, imageUrl: vehicle.filePath }; 
        });
        const rentalsWithImage = await Promise.all(promises);
        res.status(200).json(rentalsWithImage);
    } catch (error) {
        console.error("Error fetching rent data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
