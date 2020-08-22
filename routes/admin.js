'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: true});

const admin = require('../controllers/Admin');
const adminUsers = require('../controllers/Admin.Users');
const adminRubrics = require('../controllers/Admin.Rubrics');

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

//Users
router.get('/users', admin.check_auth, (req, res, next) => {
	adminUsers.list(req, res, next);
});
router.get('/users/add', admin.check_auth, (req, res, next) => {
	adminUsers.add(req, res, next);
});
router.get('/users/:id', admin.check_auth, (req, res, next) => {
	adminUsers.get(req, res, next);
});
router.get('/users/del/:id', admin.check_auth, (req, res, next) => {
	adminUsers.do_del(req, res, next);
});
router.post('/users/add', urlencodedParser, admin.check_auth, (req, res, next) => {
	adminUsers.do_add(req, res, next);
});
router.post('/users/:id', urlencodedParser, admin.check_auth, (req, res, next) => {
	adminUsers.do_edit(req, res, next);
});

//Rubrics
router.get('/rubrics', admin.check_auth, (req, res, next) => {
	adminRubrics.list(req, res, next);
});
router.get('/rubrics/add', admin.check_auth, (req, res, next) => {
	adminRubrics.add(req, res, next);
});
router.get('/rubrics/:id', admin.check_auth, (req, res, next) => {
	adminRubrics.get(req, res, next);
});
router.get('/rubrics/del/:id', admin.check_auth, (req, res, next) => {
	adminRubrics.do_del(req, res, next);
});
router.post('/rubrics/add', urlencodedParser, admin.check_auth, (req, res, next) => {
	adminRubrics.do_add(req, res, next);
});
router.post('/rubrics/:id', urlencodedParser, admin.check_auth, (req, res, next) => {
	adminRubrics.do_edit(req, res, next);
});


router.get('/items', admin.check_auth, (req, res, next) => {
	admin.page('items', req, res, next);
});
router.get('/orders', admin.check_auth, (req, res, next) => {
	admin.page('orders', req, res, next);
});


module.exports = router;
