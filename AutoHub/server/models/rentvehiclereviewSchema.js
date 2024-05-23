const mongoose = require('mongoose');

const rentvehiclereviewSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentVehicle',
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            comments: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

const RentVehicleReview = mongoose.model('RentVehicleReview', rentvehiclereviewSchema);

module.exports = RentVehicleReview;
