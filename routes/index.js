var express = require('express');
var passport = require("passport");
var router = express.Router();

var teacher = require("../models/teachers");;


// HOME ROUTE

router.get('/', function(req, res) {
 if(req.isAuthenticated()){
		res.redirect('/students');
	}else {
		 res.render('home');
	}
});


///////////////////////////////////////////////////////
//////////// LOGIN AND REGISTER STUFF /////////////////
///////////////////////////////////////////////////////

//TEACHER LOGIN FORM

router.get('/teacher', function(req,res){
	if(req.isAuthenticated()){
		res.render('students');
	}else {
		 res.render('login');
	}
})

//TEACHER REGISTER FORM
router.get('/teacher/new', function(req,res){
	if(req.isAuthenticated()){
		res.render('students');
	}else {
		res.render('register');
	}
})

//LOGIN TEACHER

router.post('/teacher/login', passport.authenticate('local', {
	successRedirect:'/students',
	failureRedirect: '/teacher',
	failureFlash:true
}), function(req, res) {
	//res.redirect('/students');
});

router.get('/teacher/logout', function (req,res){
	req.logout();
	req.flash("success", "You have successfully logged out!");
	res.redirect('/teacher');
})


//CREATE TEACHER

router.post('/teacher/register', function(req, res) {
	console.log(req.body);
	var newTeacher = new teacher({username: req.body.username});
	teacher.register(newTeacher, req.body.password, function(err, newTeacher){
		if(err){
			req.flash("error", err.message);
			return res.redirect('/teacher/new');
		} else {	
			//passport.authenticate("local")(req, res, function(){
				req.flash("success", "You have successfully registered!");
				res.redirect('/teacher');
			//})
			
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/teacher");
}



///////////////////////////////////////////////////////

module.exports = router;