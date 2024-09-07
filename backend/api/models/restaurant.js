const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    cuisineType: [String], // e.g., ["Indian", "Chinese"]
    rating: { type: Number, default: 0 },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
