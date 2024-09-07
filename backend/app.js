const express = require('express');
const app = express();
const userRoute = require('./api/routes/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');


mongoose.connect('mongodb+srv://surajbusinessconsultant:uKWqGojKWCeJX92n@cluster0.g3hjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors());

app.use('/user',userRoute);


module.exports = app;
