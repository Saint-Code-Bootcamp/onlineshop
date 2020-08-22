'use strict'
const _ = require("underscore");
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', true);

const ItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number, 
		required: true
	},
	description: String,
	short: String,
	available: {
		type: Boolean, 
		default: true,
		index: true
	},

	rubric: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rubric'
	},

	parametrs: {

	}
});

var itemModel = mongoose.model('Item', ItemSchema);
var Item = _.extend(
	itemModel,
	{
		create: function(itemData){
			var u = new itemModel(itemData);
			u = u.save();
			return u;
		},

		get: function(id){
			const u = this.findById(id);
			u.catch((e) => { throw("Item Id error"); });
			return u;
		},

		update: function(itemData){
			let data = _.clone(itemData);
			return itemModel.where({_id: itemData._id}).updateOne(data).exec();
		},

		delete: function(itemData){
			let id = _.isString(itemData) ? itemData : itemData._id;
			return itemModel.deleteOne({_id: id}).exec();
		},

		all: function(){
			return this
			.find()
			.then( (objs) => {
				return Promise.resolve(objs);
			});
		}
	}
);

module.exports = Item;
