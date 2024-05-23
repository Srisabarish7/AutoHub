const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const User = require('../models/userSchema');
const Rentvehicle = require('../models/rentvehicleSchema');
const Rentcart = require('../models/rentcartSchema');

router.post('/addrentvehicletocart', authenticate, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { itemId, rentHours } = req.body;
        const userId = req.user.id;

        const foundItem = await Rentvehicle.findById(itemId);
        if (!foundItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const { _id: itemById, brand, model, rent: itemPrice } = foundItem;

        let userCart = await Rentcart.findOne({ userById: userId });

        if (userCart) {
            const itemInCart = userCart.cartItems.some(item => item.rentvehicleid.equals(itemById));
            if (itemInCart) {
                return res.status(400).json({ message: 'Item is already in the cart' });
            } else {
                userCart.cartItems.push({
                    rentvehicleid: itemById,
                    requiredhours: rentHours,
                    rentperhour: itemPrice,
                    totalbill: itemPrice * rentHours,
                    brand,
                    model
                });
            }
            userCart = await userCart.save();
            return res.status(201).json(userCart);
        } else {
            const newCart = new Rentcart({
                userById: userId,
                cartItems: [{
                    rentvehicleid: itemById,
                    requiredhours: rentHours,
                    rentperhour: itemPrice,
                    totalbill: itemPrice * rentHours,
                    brand,
                    model
                }]
            });

            await newCart.save();
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong");
    }
});


module.exports = router;
