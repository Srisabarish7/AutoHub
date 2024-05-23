const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Rentvehicle = require('../models/rentvehicleSchema');


module.exports = router.post('/deleteRentVehicleFromDashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.vehicleIdFromDashBoard
    const x = getId
    const findVehicle = await Rentvehicle.findOneAndDelete({_id: x})

    
})