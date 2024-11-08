const express = require('express');
const router = express.Router();
const { getAllDharshan, createDharshan } = require('../controllers/dharshanController');

router.get('/dharshan', getAllDharshan);
router.post('/dharshan', createDharshan);

module.exports = router;
