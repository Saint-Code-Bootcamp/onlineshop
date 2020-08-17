'use strict'
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

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
		index: true,
		index: true
	},

	rubric: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rubric'
	},

	parametrs: {

	}
});

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;