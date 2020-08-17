'use strict'
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: String,
	password: String,
	email: String,
	session_id: String,
	isAdmin: {type: Boolean, default: false}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
