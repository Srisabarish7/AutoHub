const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Rentvehicle', 
  },
  rentalStartDate: {
    type: Date,
    required: true,
  },
  rentalEndDate: {
    type: Date,
    required: true,
  },
  rentalHours: {
    type: Number,
    required: true,
  },
  totalPrice: { 
    type: Number,
    required: true,
  },
  rentperhour: {
    type : Number,
    required : true
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String, 
    required: true,
  },
 
}, { timestamps: true }); 

module.exports = mongoose.model('Rental', rentalSchema);
