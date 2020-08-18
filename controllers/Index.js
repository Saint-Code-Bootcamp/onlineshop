'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");

module.exports = BaseController.extend({ 
	name: "Index",
	content: null,
	run: function(req, res, next) {
		const v = new View(res, 'index.html');
		v.render({title: 'index'});
	},
});