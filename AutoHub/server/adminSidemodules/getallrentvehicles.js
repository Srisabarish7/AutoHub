const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Rentvehicle = require('../models/rentvehicleSchema');

module.exports = router.get('/getAvailableRentVehicles', adminAuthentication, async (req, res) =>{
    const allRentVehicles = await Rentvehicle.find();

    try{
        
        res.status(200).send(allRentVehicles);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});