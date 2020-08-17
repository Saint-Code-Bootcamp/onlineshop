'use strict'
const mongoose = require('mongoose');

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
		ref: 'rubric',
		index: true 
	},

	parametrs: {

	}
});

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;