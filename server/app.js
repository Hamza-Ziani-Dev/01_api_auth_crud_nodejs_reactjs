var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors')

const routerUser = require('./routes/users.route');
const routerAuth = require('./routes/auth.route');


var app = express();

app.use(logger('dev'));
app.use(cors()) ;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to MongoDB");
})
.catch((err)=>{
    console.error(`Error connecting to MongoDB: ${err}`);
})

app.use("/api", routerUser);
app.use("/auth", routerAuth);


app.listen(3001, ()=>{
    console.log("Server Works Port 3001")
})

module.exports = app;
