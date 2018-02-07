var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username     : String,
	password     : String,
	token        : String,
	homeId       : String
});

module.exports = mongoose.model('User', userSchema);