var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var homeSchema = new Schema({
	title     : String,
});

module.exports = mongoose.model('Home', homeSchema);