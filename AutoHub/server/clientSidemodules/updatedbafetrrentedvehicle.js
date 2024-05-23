const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate"); // Import authentication middleware

const User = require('../models/userSchema');
const Rentvehicle = require('../models/rentvehicleSchema');
const Rentcart = require('../models/rentcartSchema');
const Rental = require('../models/rentalschema');
const Rentvehicleincomes = require('../models/rentVehicleIncomeSchema');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/updateRentDataBase', authenticate, async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const {
      token,
      vehicleId,
      rentalHours,
      totalPrice,
      rentalStartDate,
      rentalEndDate,
      rentperhour,
      brand,
      model,
    } = req.body;

    if (
      !token ||
      !vehicleId ||
      !rentalHours ||
      !totalPrice ||
      !rentalStartDate ||
      !rentalEndDate ||
      !rentperhour ||
      !brand ||
      !model
    ) {
      console.error('Missing required fields in request body!');
      return res.status(400).json({ message: 'Missing required fields in request body!' });
    }

    try {
      const findUser = await User.findOne({ _id: req.userID });

      if (!findUser) {
        console.error('User not found!');
        return res.status(400).json({ message: 'User not found!' });
      }

      const findUserByID = findUser._id;

      const findVehicle = await Rentvehicle.findById(vehicleId);
      if (!findVehicle) {
        console.error('Vehicle not found!');
        return res.status(400).json({ message: 'Vehicle not found!' });
      }

      const retailPricePerItem = findVehicle.price; // Assuming price refers to rental price per hour

      const newRental = new Rental({
        userId: findUserByID,
        vehicleId,
        rentalStartDate,
        rentalEndDate,
        rentalHours,
        totalPrice,
        rentperhour,
        brand : findVehicle.brand,
        model: findVehicle.model,
      });

      await newRental.save();

      const newIncome = new Rentvehicleincomes({
        userById: findUserByID,
        soldItems: [
          {
            vehicleId, 
            rentalHours,
            brand,
            model,
            retailPricePerItem,
            totalPrice,
          },
        ],
      });

      await newIncome.save();

      // Delete the previous rental record if it exists
      await Rental.deleteOne({ userById: findUserByID, vehicleId });

      res.status(200).json({ message: 'Rental information updated successfully!' });
    } catch (error) {
      console.error('Error updating rental database:', error);
      res.status(500).json({ message: 'Failed to update rental database!' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'An error occurred!' });
  }
});

module.exports = router;
