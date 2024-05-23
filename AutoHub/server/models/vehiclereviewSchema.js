const mongoose = require('mongoose');


const vehiclereviewSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SALEVEHICLE',
        required: true
    },
    reviews: [
        {
            user: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            name: {
                type : String,
                required : true
            },
            email: {
                type : String,
                required : true
            },
            comments: {
                type : String,
                required : true
            }
        }
    ]

},{timestamps:true})




const Salevehiclereviews = mongoose.model('SALEVEHICLEREVIEW', vehiclereviewSchema);

module.exports = Salevehiclereviews;


