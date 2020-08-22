'use strict'
const BaseController = require("./Base");
const View = require("../views/Base");
const User = require("../models/User");

module.exports = BaseController.extend({ 
	name: "AdminUsers",
	content: null,
	list: async function(req, res, next) {
		//вывод списка пользователей
        const v = new View(res, 'admin/users.html');
        const users = await User.all();
        v.render({
            page: 'users',
            objects: users,
            req: req
        });
    },
    
    get: async function(req, res, next) {
        const id = req.params.id;
        const v = new View(res, 'admin/user.html');
        v.render({
            page: 'users',
            object: await User.get(id),
            req: req,
            showdel: true
        });
    },

    add: async function (req, res, next) {
        const id = req.params.id;
        const v = new View(res, 'admin/user.html');
        v.render({
            page: 'users',
            adduser: true,
            req: req
        });
    },

    do_del: function (req, res, next) {
        const id = req.params.id;
        //User.del
        return res.redirect('/admin/users')
    },

    do_add: function (req, res, next) {

    },

    do_edit: function (req, res, next) {
        const id = req.params.id;
    },
});