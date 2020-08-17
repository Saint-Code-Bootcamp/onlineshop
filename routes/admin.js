'use strict'
const express = require('express');
const router = express.Router();

const admin = require('../controllers/Admin');

/* GET home page. */
router.get('/', (req, res, next) => {
	admin.run(req, res, next)
});

module.exports = router;
