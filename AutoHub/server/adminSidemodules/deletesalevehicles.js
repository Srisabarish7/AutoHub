const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Salevehicle = require('../models/salevehicleSchema');



module.exports = router.post('/deleteSaleVehicleFromDashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.vehicleIdFromDashBoard
    const x = getId
    const findVehicle = await Salevehicle.findOneAndDelete({_id: x})
    
})