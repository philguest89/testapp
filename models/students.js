//SCHEMA SETUP
var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
	name: String,
	grade: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments"
		}
	]
});

// MODEL SETUP

module.exports = mongoose.model("students", studentSchema);
