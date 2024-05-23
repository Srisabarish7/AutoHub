const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Rental = require('../models/rentalschema');

router.post('/checkDoubleBooking', authenticate, async (req, res) => {
  const { vehicleId, rentalStartDate, rentalEndDate } = req.body;

  try {
    const existingBookings = await Rental.find({
      vehicleId,
      rentalStartDate: { $lte: rentalEndDate },
      rentalEndDate: { $gte: rentalStartDate },
    });

    if (existingBookings.length > 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    console.error('Error checking for double booking:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/checkNextBookingDate', authenticate, async (req, res) => {
  const { vehicleId, rentalEndDate } = req.body;

  try {
    const existingBookings = await Rental.find({ vehicleId }).sort({ rentalEndDate: -1 }).limit(1);

    if (existingBookings.length > 0 && existingBookings[0].rentalEndDate) {
      const nextBookingDate = new Date(existingBookings[0].rentalEndDate);
      nextBookingDate.setDate(nextBookingDate.getDate() + 1); 

      const today = new Date();
      if (nextBookingDate <= today) {
        res.status(200).send(true); 
      } else {
        res.status(200).send(false); 
      }
    } else {
      res.status(200).send(true); 
    }
  } catch (error) {
    console.error('Error checking next booking date:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/getPreviousBookingEndDate', authenticate, async (req, res) => {
    const { vehicleId } = req.body;
  
    try {
      const mostRecentBooking = await Rental.findOne({ vehicleId }).sort({ rentalEndDate: -1 });
  
      if (mostRecentBooking) {
        res.status(200).json({ previousBookingEndDate: mostRecentBooking.rentalEndDate });
      } else {
        res.status(404).json({ message: 'No previous bookings found for the vehicle.' });
      }
    } catch (error) {
      console.error('Error fetching previous booking end date:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
