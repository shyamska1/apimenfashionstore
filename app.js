const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected mongodb server");
    });

app.use(express.static(__dirname + "/public"));
app.options('*', cors());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',require('./routes/users'));
 //app.use('/upload', auth.verifyUser, uploadRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
     res.status(500).send({ status: err.message });
    res.statusCode = 500;   
    res.json({ status: err.message });
}) 

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});






