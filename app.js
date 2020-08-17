'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config')();

const indexRouter = require('./routes');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/onlineshop', { 
	useUnifiedTopology: true , 
	useNewUrlParser: true,
}, function (err){
	if (err) {
		return console.log(err);
	}
	console.log('MongoDB runing at mongodb://' + config.mongo.host + ':' + config.mongo.port + '/onlineshop')
	app.listen(config.port, ()=>{
		console.log('Server running at http://'+config.host+ ':' +config.port+' ...');
	})
});

module.exports = app;
