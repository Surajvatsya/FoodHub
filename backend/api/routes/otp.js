const express = require('express');
const OTP = require('./models/otp'); // Path to your OTP model
const smsService = require('./smsService'); // SMS gateway service
const fast2sms = require('fast-two-sms')
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Define rate limit options
const otpRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});



// Function to generate OTP (implement your logic)
const generateOTP = () => {
    // Example: generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Generate and send OTP
router.post('/send-otp',otpRateLimiter, async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    const otpCode = generateOTP(); // Implement your OTP generation logic
    
    try {
        const result = await updateOrCreateOTP(phoneNumber, otpCode);
        if (!result) {
            return res.status(500).json({ message: 'Failed to add OTP in DB' });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateOrCreateOTP = async (phoneNumber, otpCode) => {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    var options = {
        authorization: process.env.OTP_API_KEY,
        message: `Your FoodHub verification code is ${otpCode}. Please use this code to complete your sign-in. Do not share this code with anyone.`,
        numbers: [phoneNumber]
    };

    try {
        // Update existing OTP or create a new one
        await OTP.findOneAndUpdate(
            { phoneNumber },
            { otpCode, expiresAt, isVerified: false },
            { upsert: true, new: true }
        );

        // Send the OTP to the user
        const smsResponse = await fast2sms.sendMessage(options);
        
        if (!smsResponse || !smsResponse.return) {
            throw new Error('Failed to send OTP via SMS');
        }

        return true;
    } catch (error) {
        console.error('Error updating or creating OTP:', error);
        throw new Error('Failed to update or create OTP');
    }
};


const verifyOTP = async (phoneNumber, otpCode) => {
    const otp = await OTP.findOne({ phoneNumber, otpCode, isVerified: false });

    if (!otp) {
        throw new Error('Invalid or expired OTP');
    }

    if (otp.expiresAt < Date.now()) {
        throw new Error('OTP has expired');
    }

    otp.isVerified = true;
    await otp.save();
    return 'OTP verified successfully';
};


module.exports = router;
