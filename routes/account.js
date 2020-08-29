'use strict'
const express = require('express');
const router = express.Router();

const account = require('../controllers/Account');

/* GET home page. */
router.get('/', account.is_auth, (req, res, next) => {
	account.index(req, res, next);
});
router.get('/login', account.is_auth, (req, res, next) => {
	account.login(req, res, next);
});

module.exports = router;
