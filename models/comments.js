//SCHEMA SETUP
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "teacher"
		},
		username: String
	}
})

// MODEL SETUP

module.exports = mongoose.model("comments", commentSchema);

