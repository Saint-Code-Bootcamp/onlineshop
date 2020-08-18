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
		_id: '5f3b8c40b2ae8b2d2ade250b',
		name: 'test1',
		email: 'test@test.t1',
		password: 'test1'
	};
	const res = await  User.delete(u);
	console.log(res);

});