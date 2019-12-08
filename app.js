const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbConfig = require('./config/db.json');
const config = require('./config/config.json');
const router = require('./routes');

const app = express();

mongoose.connect(
    dbConfig.dbConnectionURI,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        console.log(`--Mongo Connected--`);
    }
)

const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// middleware for route
app.use('/', router);

// listening on port
app.listen(config.port, () => console.log(`FIFA Score Keeper API Running at ${config.port}`));