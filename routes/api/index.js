const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/books', require('./books'));

module.exports = router;