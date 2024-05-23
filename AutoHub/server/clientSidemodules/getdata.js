const express = require('express');
const router = express.Router();

const authenticate = require("../middleware/authenticate");

module.exports = router.get('/getdata', authenticate, (req, res) =>{
    res.send(req.rootUser);
});