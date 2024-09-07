const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const userRoutes = require('./api/routes/user');
const orderRoutes = require('./api/routes/order');
const restaurantRoutes = require('./api/routes/restaurant');
const menuRoutes = require('./api/routes/menu');
const paymentRoutes = require('./api/routes/payment');
const app = express();


mongoose.connect('mongodb+srv://surajbusinessconsultant:uKWqGojKWCeJX92n@cluster0.g3hjn.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

// Define a global rate limiter
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the global rate limiter to all requests
app.use(globalRateLimiter);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/payments', paymentRoutes);


module.exports = app;
