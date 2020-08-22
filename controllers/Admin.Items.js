'use strict'
const _ = require("underscore");
const BaseController = require("./Base");
const View = require("../views/Base");
const Item = require("../models/Item");
const Rubric = require("../models/Rubric");

module.exports = BaseController.extend({ 
	name: "AdminItem",
	content: null,
	list: async function(req, res, next) {
		//вывод списка 
        const v = new View(res, 'admin/items.html');
        const items = await Item.all();
        v.render({
            page: 'items',
            objects: items,
            req: req
        });
    },
    
    get: async function(req, res, next) {
        const id = req.params.id;
        const v = new View(res, 'admin/item.html');
        v.render({
            page: 'items',
            object: await Item.get(id),
            req: req,
            showdel: true,
            rubrics: await Rubric.all()
        });
    },

    add: async function (req, res, next) {
        const v = new View(res, 'admin/item.html');
        v.render({
            page: 'items',
            additem: true,
            req: req
        });
    },

    do_del: function (req, res, next) {
        const id = req.params.id;
        Item.delete(id);
        return res.redirect('/admin/items');
    },

    do_add: function (req, res, next) {
        const r = Item.create(req.body)
        .then((item) => {
            res.redirect('/admin/items/' + item._id);
        })
        .catch((err) => {
            const v = new View(res, 'admin/item.html');
            return v.render({
                page: 'items',
                object: req.body,
                additem: true,
                req: req,
                error: err.message
            });    
        });
        return r;
    },

    
    do_edit: function (req, res, next) {
        const id = req.params.id;
        const item = Item.update(_.extend({}, {_id: id}, req.body))
        .then((item) => {
            res.redirect('/admin/items/' + item._id);
        });
        return item;
    },
});