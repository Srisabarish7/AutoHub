const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middleware/adminAuthentication");

const Rentvehicle = require('../models/rentvehicleSchema');

const multer = require("multer");

const upload = multer({ dest: 'uploads/' });



module.exports = router.post('/addrentvehicles', adminAuthentication, upload.single("myrentfile"),  async(req, res, next)=>{
    
    try {
            const data = new Rentvehicle({
                brand : req.body.brand,
                model : req.body.model,
                year : req.body.year,
                color : req.body.color,
                seats : req.body.seats,
                price : req.body.price,
                rent : req.body.rent,
                fileName : req.file.originalname,
                filePath : req.file.path,
                fileType : req.file.mimetype,
                fileSize : req.file.size, 
            });
            await data.save();
            res.status(201).send("Data uploaded successfully")
    } catch (error) {
        res.status(400).send(error.message);
    }
   
} )