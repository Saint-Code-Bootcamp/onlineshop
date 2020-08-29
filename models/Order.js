'use strict'
const _ = require('underscore');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', true);

const OrderSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User' ,
		index: true
	},
	items: [],
	address: {
		type: String,
		default: ''
	},
	status: {
		type: Number,
		default: 0
	},
	comment: {
		type: String,
		default: ''
	},
	sum: Number,
	date: {
		type: Date,
		default: Date.now
	}
});

var orderModel = mongoose.model('Order', OrderSchema);
var Order = _.extend(
	orderModel,
	{
		create: async function(data){
			const User = require("./User");
			data.user = await User.get(data.user._id);
			var u = new orderModel(data);
			u = u.save();
			return u;
		},

		get: function(id){
			const u = this.findById(id);
			u.catch((e) => { throw("Item Id error"); });
			return u;
		},

	
		update: async function(data){
			return this.where({_id: data._id}).updateOne(data).exec();
		},

		delete: function(data){
			let id = _.isString(data) ? data : data._id;
			return this.deleteOne({_id: id}).exec();
		},

		list: function(user){
			return this
			.find({user: user}).exec()
			.then( (objs) => {
				return Promise.resolve(objs);
			});
		}
	}
);
module.exports = Order;