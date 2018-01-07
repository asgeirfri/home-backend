'use strict';
var mongoose = require('mongoose');

//Connects the database
module.exports = () => {
	if (process.env.NODE_ENV === 'testing') {
		mongoose.connect(`mongodb://localhost/${process.env.MOCK_DB}`);
	} else {
		mongoose.connect(`mongodb://localhost/${process.env.DB}`);
	}
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('Connected to db');
	});
};
