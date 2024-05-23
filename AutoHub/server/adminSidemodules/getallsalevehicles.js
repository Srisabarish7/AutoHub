const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Salevehicle = require('../models/salevehicleSchema');


module.exports = router.get('/getAvailableSaleVehicles', adminAuthentication, async (req, res) =>{
    const allSaleVehicles = await Salevehicle.find();

    try{
        
        res.status(200).send(allSaleVehicles);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});