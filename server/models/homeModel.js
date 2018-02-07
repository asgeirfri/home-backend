var mongoose    = require('mongoose'),
	Schema      = mongoose.Schema;

var task       = new Schema({
	title         : String,
	due           : Number,
	type          : {
		enum: [ "Daily", "Weekly", "Monthly", "Yearly", null ]
	},
	assignedTo    : String
});

var homeSchema = new Schema({
	name          : String,
	password      : String,
	adminId       : String,
	tasks         : [task],
});

module.exports = mongoose.model('Home', homeSchema);