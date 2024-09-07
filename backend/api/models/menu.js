const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    itemName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String }, // e.g., Starter, Main Course, Dessert
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Menu', menuSchema);
