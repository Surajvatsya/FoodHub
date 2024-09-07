const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otpCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OTP', otpSchema);
