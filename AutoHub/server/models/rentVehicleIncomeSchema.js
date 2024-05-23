const mongoose = require('mongoose');

const rentVehicleIncomeSchema = new mongoose.Schema({
  userById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  soldItems: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RENTVEHICLE',
      
    },
    rentalHours: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    retailPricePerItem: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  }],
},{timestamps:true})




const Rentvehicleincomes = mongoose.model('RENTVEHICLEINCOME', rentVehicleIncomeSchema);

module.exports = Rentvehicleincomes;


