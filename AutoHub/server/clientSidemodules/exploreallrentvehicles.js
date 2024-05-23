const express = require('express');
const router = express.Router();

const Rentvehicle = require('../models/rentvehicleSchema');

module.exports = router.get('/exploreRentVehicleData', async (req, res) =>{
    const rentVehicleData = await Rentvehicle.find();
    try{
        
        res.status(200).send(rentVehicleData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});