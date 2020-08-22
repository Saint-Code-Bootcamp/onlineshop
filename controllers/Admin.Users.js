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
    
    details: async function(req, res, next) {
        const id = req.params.id;
        const v = new View(res, 'admin/user.html');
        v.render({
            page: 'users',
            object: await User.get(id),
            req: req
        });
    },
});