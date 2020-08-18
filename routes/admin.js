'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: true});

const admin = require('../controllers/Admin');

//корень админки
router.get('/', admin.is_auth, (req, res, next) => {
	if (req.is_auth) {
		admin.index(req, res, next)
	} else {
		admin.login(req, res, next)
	}	
});
router.post('/', urlencodedParser, (req, res, next) => {
	admin.do_login(req, res, next)
});

//выйти
router.get('/logout', (req, res, next) => {
	admin.logout(req, res, next)
});

router.get('/items', admin.check_auth, (req, res, next) => {
	admin.page('items', req, res, next);
});
router.get('/users', admin.check_auth, (req, res, next) => {
	admin.page('users', req, res, next);
});
router.get('/rubrics', admin.check_auth, (req, res, next) => {
	admin.page('rubrics', req, res, next);
});
router.get('/orders', admin.check_auth, (req, res, next) => {
	admin.page('orders', req, res, next);
});


module.exports = router;
