const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const router = express.Router();

// Create Order
router.post('/', (req, res) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        restaurant: req.body.restaurant,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        status: req.body.status,
        paymentMethod: req.body.paymentMethod,
        deliveryAddress: req.body.deliveryAddress,
        orderedAt: req.body.orderedAt
    });
    order.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err }));
});

// Read Order
router.get('/:orderId', (req, res) => {
    Order.findById(req.params.orderId)
        .populate('user')
        .populate('restaurant')
        .populate('items.menuItem')
        .then(order => {
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Update Order
router.put('/:orderId', (req, res) => {
    Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true })
        .then(order => {
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Delete Order
router.delete('/:orderId', (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(result => res.status(200).json({ message: 'Order deleted' }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
