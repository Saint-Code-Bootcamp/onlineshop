'use strict'
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const OrderSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user' ,
		index: true
	},
	item_name: String,
	cnt: Number,
	price: Number,
	discount: {type: Number, default: 0}
});

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
