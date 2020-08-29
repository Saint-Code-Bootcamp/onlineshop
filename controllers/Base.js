'use strict'
const User = require("../models/User");
const _ = require("underscore");
module.exports = {
	name: "base",

	extend: function(child) {
		return _.extend({}, this, child);
	},

	_check_auth: function(req, res, next, ret) {
		//Middleware
		//проверить авторизацию и если ее нет, отфутболит авторизоваться
		if (! ( req.session.user && 
				req.session.user.session_id == req.session.id)) return res.redirect(ret);

		//авторизован, но проверим что пользователь админ. Вдруг он зашел просто на сайте и пытается пойти в админку
		const user = User.get(req.session.user._id).then((u) => {
			if (u.session_id == req.session.id){
				req.is_auth = true;
				return next();
			} else {
				return res.redirect(ret);
			}
		});		
	},

	is_auth: function(req, res, next){
		//Middleware
		//проверка на аутентификацию
		if (req.session.user && 
			req.session.user.session_id == req.session.id){
			req.is_auth = true;
		} else {
			req.is_auth = false;
		}		
		return next();
	},

	do_logout: function(req){
		//уничтожить сессию
		if (req.session.user) {
			delete req.session.user;
			req.session.save();
			req.is_auth = false;
		}
	}
}