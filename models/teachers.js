//SCHEMA SETUP
var mongoose = require('mongoose'),
	passportLocalMongoose = require("passport-local-mongoose");

var teacherSchema = new mongoose.Schema({
	username: String,
	password: String
});

//Setup Passport functionality
teacherSchema.plugin(passportLocalMongoose);

// MODEL SETUP

module.exports = mongoose.model("teachers", teacherSchema);
