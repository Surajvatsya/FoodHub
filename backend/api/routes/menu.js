const express = require('express');
const mongoose = require('mongoose');
const Menu = require('../models/menu');
const router = express.Router();

// Create Menu Item
router.post('/', (req, res) => {
    const menuItem = new Menu({
        _id: new mongoose.Types.ObjectId(),
        restaurant: req.body.restaurant,
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    menuItem.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err }));
});

// Read Menu Item
router.get('/:menuId', (req, res) => {
    Menu.findById(req.params.menuId)
        .populate('restaurant')
        .then(menuItem => {
            if (!menuItem) return res.status(404).json({ message: 'Menu Item not found' });
            res.status(200).json(menuItem);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Update Menu Item
router.put('/:menuId', (req, res) => {
    Menu.findByIdAndUpdate(req.params.menuId, req.body, { new: true })
        .then(menuItem => {
            if (!menuItem) return res.status(404).json({ message: 'Menu Item not found' });
            res.status(200).json(menuItem);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Delete Menu Item
router.delete('/:menuId', (req, res) => {
    Menu.findByIdAndRemove(req.params.menuId)
        .then(result => res.status(200).json({ message: 'Menu Item deleted' }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
