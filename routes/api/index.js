const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/books', require('./books'));
router.use('/entry', require('./entry'));

module.exports = router;