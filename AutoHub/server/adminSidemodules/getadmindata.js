const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");


//dashboard authentication 
module.exports = router.get('/dashboard', adminAuthentication, (req, res) =>{

    res.send(req.rootAdmin);
})