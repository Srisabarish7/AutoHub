const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Rentvehicle = require('../models/rentvehicleSchema');

router.get('/getRentVehicleData', authenticate, async (req, res) => {
  try {
    let filter = {}; 

    if (req.query.seats) {
      const seats = parseInt(req.query.seats);
      if (!isNaN(seats)) {
        if (seats >= 4) {
          filter.seats = { $gte: 4 }; 
        } else if (seats === 2) {
          filter.seats = { $eq: '2' }; 
        }
      }
    }

   
    const rentVehicleData = await Rentvehicle.find(filter);
    res.status(200).send(rentVehicleData);
  } catch (error) {
    console.error('Error fetching rent vehicle data:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
