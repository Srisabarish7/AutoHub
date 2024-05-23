const mongoose = require('mongoose');


const saleVehicleIncomeSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    soldItems: [
        {
            productId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Salevehicle',
                required : true
            },
            quantity: {
                type : Number,
                default : 1
            },
            brand: {
                type : String,
                required : true
            },
            model: {
                type : String,
                required : true
            },
            retailPricePerItem: {
                type : Number,
                required : true
            },
            totalPrice: {
                type : Number,
                required : true
            },
            totalIncome: {
                type : Number,
                required : true
            },
        }
    ]

},{timestamps:true})




const Salevehicleincomes = mongoose.model('SALEVEHICLEINCOME', saleVehicleIncomeSchema);

module.exports = Salevehicleincomes;


