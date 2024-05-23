const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Rentvehicleincomes = require('../models/rentVehicleIncomeSchema');

module.exports = router.get('/getrentvehicleincome', adminAuthentication, async (req, res) =>{
    const allIncomes = await Rentvehicleincomes.find();

   
    try{
        
        res.status(200).send(allIncomes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});
