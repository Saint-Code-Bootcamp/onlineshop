'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");

module.exports = BaseController.extend({ 
	name: "Admin",
	content: null,
	login: function(req, res, next) {
		const v = new View(res, 'admin/login.html');
		v.render();
	},
});