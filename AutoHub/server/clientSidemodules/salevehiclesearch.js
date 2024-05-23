const express = require('express');
const router = express.Router();

const Salevehicle = require('../models/salevehicleSchema');

let getSearch;

router.post('/searchSaleVehicle', async (req, res) => {
    try {
        const searchText = req.body.searchText;
        const searchCategory = await Salevehicle.find({ $text: { $search: searchText } });
        getSearch = searchCategory;
        return res.status(201).send(searchCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/salevehiclesearchCategory', async (req, res) => {
    try {
        res.status(200).send(getSearch);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
