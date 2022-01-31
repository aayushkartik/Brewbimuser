const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookieParser');
const userRouter = require('./Routes/userRouter');
const app = express();
app.use(cors({
    "origin": "*", // write here the path or url at which frontend is hosted
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  }));
app.use(cookieParser());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/brewbim", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(userRouter);

app.listen(9000,(req, res) => {
    console.log('listening on port 9000')
})
