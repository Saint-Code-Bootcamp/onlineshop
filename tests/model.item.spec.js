'use strict'
const mongoose = require('mongoose');
var config = require('../config')();

describe("Модель Item", function() {
	it("товар", function(next) {
		var Item = require('../models/Item');
		mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/onlineshop', { 
			useUnifiedTopology: true , 
			useNewUrlParser: true,
		}, function (err){
			expect(err).toBe(null);
			var test = Item({
				name: 'test',
				price: 1000,
				description: 'description',
				short: 'short',
				available: false
			});
			test.save(function (err){
				expect(err).toBe(null);
				expect(test._id).toBeDefined();
				Item.deleteOne({_id: test._id}, function (err){
					expect(err).toBe(null);
					next();
				});
				
			});			
		});
		
	});
});