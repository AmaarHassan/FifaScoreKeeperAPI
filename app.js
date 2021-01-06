const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const { startApolloServer } = require('./apolloServer');

const app = express();

mongoose.connect(
    process.env.dbConnectionURI,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        console.log(`MongoDB : ${process.env.dbConnectionURI}`);
    }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// middleware for route
app.use('/', router);

// listening on port
app.listen(process.env.port, () => {
    console.log(`FIFA Score Keeper API Running at ${process.env.port}`)
    console.log(`Environment: ${process.env.ENV} `)
    startApolloServer();
});
