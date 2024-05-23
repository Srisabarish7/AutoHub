const express = require('express');
const router = express.Router();

const Rentvehicle = require('../models/rentvehicleSchema');

let getRentSearch;

router.post('/searchRentVehicle', async (req, res) => {
    try {
        const searchText = req.body.searchText;
        const searchCategory = await Rentvehicle.find({ $text: { $search: searchText } });

        getRentSearch = searchCategory;

        res.status(201).send(searchCategory);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/rentvehiclesearchCategory', async (req, res) => {
    try {
        res.status(200).send(getRentSearch);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
