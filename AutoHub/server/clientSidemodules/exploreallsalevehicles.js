const express = require('express');
const router = express.Router();

const Salevehicle = require('../models/salevehicleSchema');

module.exports = router.get('/exploreSaleVehicleData', async (req, res) =>{
    const saleVehicleData = await Salevehicle.find();
    try{
        
        res.status(200).send(saleVehicleData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});