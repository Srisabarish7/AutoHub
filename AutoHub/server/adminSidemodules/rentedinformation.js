const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Rentalvehicle = require('../models/rentalschema');

module.exports = router.get('/getRentalData', adminAuthentication, async (req, res) => {
    try {
        let filter = {};

        if (req.query.option) {
            const option = req.query.option;

            if (option.length === 2) {
                const selectedMonth = parseInt(option, 10); 
                const startDate = new Date(Date.UTC(new Date().getFullYear(), selectedMonth - 1, 1)); 
                const endDate = new Date(Date.UTC(new Date().getFullYear(), selectedMonth, 0));

                filter = { rentalStartDate: { $gte: startDate }, rentalEndDate: { $lte: endDate } };
            } else if (option === 'ongoing') {
                filter = { rentalEndDate: { $gte: new Date() } };
            } else if (option === 'rented') {
                filter = { rentalEndDate: { $lt: new Date() } };
            }
        }

        const allRentalVehicles = await Rentalvehicle.find(filter);

        res.status(200).json(allRentalVehicles);
    } catch (error) {
        console.error("Error fetching rental data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
