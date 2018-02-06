var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var homeSchema = new Schema({
	name     : String,
});

module.exports = mongoose.model('Home', homeSchema);