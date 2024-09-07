const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    address: { type: String },
    role: { type: String, enum: ['customer', 'restaurant-owner'], default: 'customer' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);