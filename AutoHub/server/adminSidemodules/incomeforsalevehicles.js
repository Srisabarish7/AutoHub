const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Salevehicleincomes = require('../models/saleVehicleIncomeSchema');

//get vehicle income in dashboard
module.exports = router.get('/getsalevehicleincome', adminAuthentication, async (req, res) =>{
    const allIncomes = await Salevehicleincomes.find();

    // console.log(allIncomes);
    try{
        
        res.status(200).send(allIncomes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});