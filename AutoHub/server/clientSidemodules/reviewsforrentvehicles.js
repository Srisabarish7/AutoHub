const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Rentvehicle = require('../models/rentvehicleSchema');
const Rentvehiclereview = require('../models/rentvehiclereviewSchema');

router.get('/getRentVehicleDetails/:selectedVehicleId', async (req, res) => {
  const { selectedVehicleId } = req.params;

  try {
    const findVehicle = await Rentvehicle.findById(selectedVehicleId);

    if (!findVehicle) {
      return res.status(404).send({ message: 'Vehicle not found' });
    }

    res.status(200).send(findVehicle);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/postrentvehiclereviews', authenticate, async (req, res) => {
  try {
    const { name, email, comments, selectedVehicleId } = req.body;
    if (!name || !email || !comments || !selectedVehicleId) {
      return res.status(400).json({ error: 'Please fill out all required fields' });
    }

    const findVehicle = await Rentvehicle.findById(selectedVehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const newReview = new Rentvehiclereview({
      vehicle: selectedVehicleId,
      reviews: {
        user: req.userID, 
        name,
        email,
        comments,
      },
    });

    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});


router.get('/getReviewsForRentVehicle/:selectedVehicleId', async (req, res) => {
  const { selectedVehicleId } = req.params;

  try {
    const foundReviews = await Rentvehiclereview.find({ vehicle: selectedVehicleId })
    .populate('reviews', 'name email comments');
    if (!foundReviews) {
      return res.status(404).json({ message: 'No reviews found for this vehicle' });
    }

    res.status(200).json(foundReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});



module.exports = router;
