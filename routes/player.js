const express = require('express');
const router = express.Router();
const { getAll, get, insert } = require('../controllers/player');

router.get('/', getAll);
router.get('/:uuid', get);
router.post('/', insert);

module.exports = router;