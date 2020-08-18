'use strict'
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', true);

const BasketSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		index: true
	},
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'item'
	},
	cnt: Number,
	price: Number,
	discount: {type: Number, default: 0}
});

var Basket = mongoose.model('Basket', BasketSchema);
module.exports = Basket;
