'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");
const User = require("../models/User");

module.exports = BaseController.extend({ 
	name: "Admin",
	content: null,
	check_auth: function(req, res, next) {
		//Middleware
		return BaseController._check_auth(req, res, next, '/admin');
	},

	index: function(req, res, next) {
		//
		if (!req.is_auth){
			return res.redirect("/accound/login");
		}
		const user = User.get(req.session.user._id);
		const v = new View(res, 'admin/index.html');
		v.render({
			req: req,
			user: user
		});
	},

	login: function(req, res, next) {
		//страница авторизации админки
		const v = new View(res, 'admin/login.html');
		v.render({req: req});
	},

	logout: function(req, res, next) {
		//выход
		this.do_logout(req);
		res.redirect('/admin')
	},

	do_login: async function (req, res, next) {
		//произвести авторизацию
		if ( !req.body ) return res.sendStatus(400); //если нету данные в POST
		
		const postData = {
			email: req.body.email,
			password: req.body.password
		};

		const user = await User.check(postData);
		if ( !user ) return res.redirect('/admin?err=1'); //нет совпадения емайл+пароль

		if ( !user.is_admin ) return res.redirect('/admin?err=2'); //не админ

		//сохраним данные пользователья в сессии
		req.session.user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			is_admin: user.is_admin,
			session_id: req.session.id
		};
		req.session.save();
		await User.update(req.session.user);

		return res.redirect('/admin');
	},

	
});