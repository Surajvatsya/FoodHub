const express = require('express');
const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const router = express.Router();

// Create Payment
router.post('/', (req, res) => {
    const payment = new Payment({
        _id: new mongoose.Types.ObjectId(),
        order: req.body.order,
        amount: req.body.amount,
        method: req.body.method,
        status: req.body.status,
        transactionId: req.body.transactionId
    });
    payment.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err }));
});

// Read Payment
router.get('/:paymentId', (req, res) => {
    Payment.findById(req.params.paymentId)
        .populate('order')
        .then(payment => {
            if (!payment) return res.status(404).json({ message: 'Payment not found' });
            res.status(200).json(payment);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Update Payment
router.put('/:paymentId', (req, res) => {
    Payment.findByIdAndUpdate(req.params.paymentId, req.body, { new: true })
        .then(payment => {
            if (!payment) return res.status(404).json({ message: 'Payment not found' });
            res.status(200).json(payment);
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Delete Payment
router.delete('/:paymentId', (req, res) => {
    Payment.findByIdAndRemove(req.params.paymentId)
        .then(result => res.status(200).json({ message: 'Payment deleted' }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
