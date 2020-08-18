'use strict'
const User = require("../models/User");
const _ = require("underscore");
module.exports = {
	name: "base",

	extend: function(child) {
		return _.extend({}, this, child);
	},

	run: function(req, res, next) {
	},

	is_auth: function(req, res, next){
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