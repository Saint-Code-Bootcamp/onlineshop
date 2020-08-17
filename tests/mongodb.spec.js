var config = require('../config')();
describe("MongoDB", function() {
	it("запущен ли сервер", function(next) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/onlineshop', { useUnifiedTopology: true }, function(err, db) {
			expect(err).toBe(null);
			expect(db).toBeDefined();
			next();
		});
	});
});