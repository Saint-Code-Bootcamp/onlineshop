'use strict'
const mongoose = require('mongoose');

const RubricSchema = mongoose.Schema({
	name: String,
});

var Rubric = mongoose.model('Rubric', RubricSchema);
module.exports = Rubric;
