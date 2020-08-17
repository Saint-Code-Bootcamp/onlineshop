'use strict'
const express = require('express');
const router = express.Router();

const index = require('../controllers/Index');

/* GET home page. */
router.get('/', (req, res, next) => {
	index.run(req, res, next)
});

module.exports = router;
