const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant'); // Path to your Restaurant model

const router = express.Router();

// Create a new restaurant
router.post('/', (req, res) => {
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        cuisineType: req.body.cuisineType,
        menu: req.body.menu
    });

    restaurant.save()
        .then(result => {
            res.status(201).json({
                message: 'Restaurant created successfully',
                createdRestaurant: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


// Get all restaurants
router.get('/listAll', (req, res) => {
    Restaurant.find()
        .populate('owner')  // Assuming you want to populate the owner
        .populate('menu')   // Assuming you want to populate the menu items
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// Get a restaurant by ID
router.get('/:restaurantId', (req, res) => {
    Restaurant.findById(req.params.restaurantId)
        .populate('owner')
        .populate('menu')
        .then(restaurant => {
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json(restaurant);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});



// Delete a restaurant by ID
router.delete('/:restaurantId', (req, res) => {
    Restaurant.findByIdAndDelete(req.params.restaurantId)
        .then(result => {
            if (!result) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;
