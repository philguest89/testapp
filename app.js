// REQUIRES

var express = require('express'),

	cat = require('cat-me'),

	bodyParser = require("body-parser"),
	flash = require("connect-flash"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	passport = require("passport"),
	localStrategy = require("passport-local");

var app = express();

var	student = require("./models/students"),
	comment = require("./models/comments"),
	teacher = require("./models/teachers"),

	indexRoutes = require("./routes/index"),
	studentRoutes = require("./routes/studentroutes"),
	commentRoutes = require("./routes/commentroutes");

	// INITIATE EXPRESS
app.use(express.static('public'));

// INITIATE METHOD OVERRIDE

app.use(methodOverride("_method"));


// INITIATE BODY PARSER

app.use(bodyParser.urlencoded({extended:true}));

// INITIATE FLASH MESSAGES

app.use(flash());


// USE EJS FOR FILES

app.set('view engine', 'ejs');

//DB SETUP

mongoose.connect("mongodb://localhost/testDB", { useMongoClient: true });

//Initiate Passport

var	passportLocalMongoose = require("passport-local-mongoose"),
	expressSession = require("express-session");

app.use(expressSession ({
	secret:"Phil is the best",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(teacher.authenticate()));
passport.serializeUser(teacher.serializeUser());
passport.deserializeUser(teacher.deserializeUser());


// Global Variables

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


//INITIATE ROUTES

app.use(indexRoutes);
app.use('/students', studentRoutes);
app.use('/students/:id/comments', commentRoutes);




 
// SERVER START

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

console.log(cat());
