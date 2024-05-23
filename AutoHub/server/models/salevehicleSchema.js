const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salevehicleSchema = new mongoose.Schema({
     brand: {
         type : String,
         required: true
     },
     model: {
         type: String,
         required: true
     },
     year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    enginecc: {
        type: String,
        required: true
    },
    maxpower: {
        type: String,
        required: true
    },
    airbags: {
        type: String,
       
    },
    rearcamera: {
        type: String,
        
    },
    price: {
        type: String,
        required: true
    },
    retailprice: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
},{timestamps:true})


salevehicleSchema.index({ brand: "text", model: "text" });

const Salevehicle = mongoose.model('SALEVEHICLE', salevehicleSchema);

module.exports = Salevehicle;


