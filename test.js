'use strict';
const mongoose = require('mongoose');
const config = require('./config')();

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/onlineshop', { 
	useUnifiedTopology: true , 
	useNewUrlParser: true,
}, async function (err){
	if (err) {return console.log(err);}
	const User = require('./models/User');
	var u = {
		name: 'test',
		email: 'test@test',
		password: 'test',
		is_admin: false
	};
	u = await  User.getByEmail('admin@admin')
	const res = await User.update({_id: u._id, is_admin: true});
	console.log(res);

});