'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");


module.exports = BaseController.extend({ 
	name: "Account",
	content: null,
	index: async function(req, res, next) {
        const v = new View(res, 'account.html');
        if (!req.is_auth) {
            return res.redirect('/account/login');
        }
        v.render({
            req: req
        });
	},

    login: async function(req, res, next) {
        const v = new View(res, 'account_login.html');
        v.render({
            req: req
        });
	},

});