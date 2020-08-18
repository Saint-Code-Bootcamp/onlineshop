//Этот модуль не используется
'use strict'
var _ = require("underscore");

module.exports = {
	name: name,
	Model: mongoose.model(name, Schema),

	extend: function(child) {
		return _.extend({}, this, child);
	},

	get: function(id){
		const u = this.findById(id);
		u.catch((e) => {
			throw("Id error");
		});
		return u;
	},

	update: function(data){
		return Model.where({_id: data._id}).update(data).exec();
	},

	delete: function(data){
		//userData is _id Number or {_id: 'id'}
		let id = _.isNumber(data) ? data : data._id;
		return Model.deleteOne({_id: id});
	}
}


