'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");
const User = require("../models/User");

module.exports = BaseController.extend({ 
	name: "Admin",
	content: null,
	check_auth: function(req, res, next) {
		//Middleware
		//проверить авторизацию и если ее нет, отфутболит авторизоваться
		if (! ( req.session.user && 
				req.session.user.session_id == req.session.id)) return res.redirect('/admin');

		//авторизован, но проверим что пользователь админ. Вдруг он зашел просто на сайте и пытается пойти в админку
		const user = User.get(req.session.user._id).then((u) => {
			if (u.is_admin && u.session_id == req.session.id){
				req.is_auth = true;
				return next();
			} else {
				return res.redirect('/admin')
			}
		});		
	},

	index: function(req, res, next) {
		//показать главную страницу админки
		const v = new View(res, 'admin/index.html');
		v.render({req: req});
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
		if ( !req.body ) return response.sendStatus(400); //если нету данные в POST
		
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

	page: function(page, req, res, next) {
		//соберем внутренние страницы админки 
		const v = new View(res, 'admin/index.'+page+'.html');
		var data;
		switch (page) {
			case 'items': data = this.get_items();
			case 'rubrics': data = this.get_rubrics();
			case 'users': data = this.get_users();
			case 'orders': data = this.get_orders();
		}
		v.render({
			page: page, 
			data: data,
			req: req
		});
	},

	//эти функции отдадут данные для отображения
	get_items: function() {
		return [];
	},
	get_rubrics: function() {
		return [];
	},
	get_users: function() {
		return [];
	},
	get_orders: function() {
		return [];
	}
});