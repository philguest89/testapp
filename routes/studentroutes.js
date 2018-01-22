var express = require('express');
var router = express.Router();

var student = require("../models/students"),
	comment = require("../models/comments"),
	teacher = require("../models/teachers");

var middleware = require('../middleware');

// INDEX ROUTE

//Show all students
router.get('/', middleware.isLoggedIn, function(req, res) {
 student.find({}, function(err, students){
 	if(err){
 		console.log('err');
 	} else {
		res.render('students', {students: students});

 	}
 });
});


// NEW ROUTE

//Show new student form
router.get('/new', middleware.isLoggedIn, function(req, res) {
 res.render('newstudent', {currentUser: req.user});
});

// CREATE ROUTE

//Create new student
router.post('/', middleware.isLoggedIn, function(req, res) {
	student.create(req.body.student, function(err, student){
		if(err){
			console.log(err);
		} else {
			res.redirect('/students');
		}
	});
});



// SHOW ROUTE

//Show student
router.get('/:id', middleware.isLoggedIn, function(req, res) {
 student.findById(req.params.id).populate("comments").exec(function(err, student){
 	if(err) {
 		console.log(err);
 		res.redirect('/students');
 	}else{ 		
 		console.log(student.comments)
 		res.render('showstudent', {student: student});
 		}
 	})
});

//EDIT ROUTE

//Show edit student form
router.get('/:id/edit', middleware.isLoggedIn, function(req, res) {
 student.findById(req.params.id, function(err, student){
 	if(err) {
 		console.log(req.params.id);
 		res.redirect('/students/:id/edit');
 	}else{
 		res.render('editstudent', {student: student});
 		}
 	})
});

// UPDATE ROUTE

//Update student
router.put('/:id', middleware.isLoggedIn, function(req,res){
	student.findByIdAndUpdate(req.params.id, req.body.student, function(err, updatedStudent){
			if(err){
				res.redirect('/students');
			} else {
				res.redirect('/students/' + req.params.id);
			}
	});
});

// DELETE ROUTE

//Delete student
router.delete('/:id', middleware.isLoggedIn, function(req,res){
	student.findByIdAndRemove(req.params.id, function(err) {
    if (err){
    	res.redirect('/students');
    } else {
    	res.redirect('/students');
    }
  });
})


// SEND BACK ROUTER TO APP.JS
module.exports = router;