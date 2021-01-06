const express = require('express');
const router = express.Router();
const playerRouter = require('./player');
const fifaGameRouter= require('./fifaGame')

router.use('/games', fifaGameRouter)
router.use('/players', playerRouter)

router.get('/', (req, res) => res.send('Response of an API is questionable...'))

// export of the file
module.exports = router;