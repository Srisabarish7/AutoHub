const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
const { v4: uuidv4 } = require('uuid');

const Rentvehicle = require('../models/rentvehicleSchema');

router.post('/stripeRentPay', async (req, res) => {
  try {
    const { idRentedVehicle, hoursRequired } = req.body;

    await Rentvehicle.updateOne({ "_id": idRentedVehicle }, {
      $set: {
        "availability": "Not Available for " + hoursRequired,
        "bookedHours": hoursRequired,
      }
    });

    res.status(200).json({ message: 'Payment successful!' });
  } catch (error) {
    console.error('Error updating rented vehicle information:', error);
    res.status(500).json({ message: 'Failed to update rental information!' });
  }
});

module.exports = router;
