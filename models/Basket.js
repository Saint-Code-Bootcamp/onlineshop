'use strict'
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', true);

const BasketSchema = mongoose.Schema({
	user: {
		type: String, //может быть идентификатором пользователя или сессии
		index: true
	},
	user_type: Number, //0 - неавторизированый, 1 - авторизированый
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'item'
	},
	cnt: Number,
	price: Number,
	discount: {type: Number, default: 0}
});

var basketModel = mongoose.model('Item', BasketSchema);
var Basket = _.extend(
	basketModel,
	{
		create: async function(data){
			const Item = require("../models/item");
			data.item = await Item.get(data.item);
			var u = new basketModel(data);
			u = u.save();
			return u;
		},

		get: function(id){
			const u = this.findById(id);
			u.catch((e) => { throw("Item Id error"); });
			return u;
		},

		update: async function(itemData){
			let data = _.clone(itemData);
			const Rubric = require("../models/Rubric");
			data.rubric = await Rubric.get(data.rubric);
			return itemModel.where({_id: itemData._id}).updateOne(data).exec();
		},

		delete: function(itemData){
			let id = _.isString(itemData) ? itemData : itemData._id;
			return itemModel.deleteOne({_id: id}).exec();
		},

		list: function(user_id){
			return this
			.find(user = user_id)
			.then( (objs) => {
				return Promise.resolve(objs);
			});
		}
	}
);
module.exports = Basket;
