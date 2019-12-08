// purpose of routes is to have all the routes of different controllers in separate layer
const express = require('express');
const router = express.Router();
const playerRouter = require('./player');

router.use('/players', playerRouter)

router.get('/', (req, res) => res.send('Response of an API is questionable...'))

// export of the file
module.exports = router;