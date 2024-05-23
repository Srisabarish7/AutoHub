const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const User = require('../models/userSchema');
const Salevehicle = require('../models/salevehicleSchema');

module.exports = router.get('/getSaleVehicleData', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const saleVehicleData = await Salevehicle.find();
    try{
        
        res.status(200).send([{saleVehicleData, findUser}]);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});