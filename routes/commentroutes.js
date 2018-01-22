var express = require('express');
var router = express.Router({mergeParams:true});

var student = require("../models/students"),
	comment = require("../models/comments");

var middleware = require('../middleware');

// NEW ROUTE

//Show new comment form
router.get('/new', middleware.isLoggedIn, function(req, res) {
 student.findById(req.params.id, function(err, student){
 	if(err) {
 		console.log(req.params.id);
 		res.redirect('/students');
 	}else{
 		res.render('newcomment', {student: student});
 		}
 	})
});

// CREATE ROUTE

//Create new comment
router.post('/', middleware.isLoggedIn, function(req, res) {
 student.findById(req.params.id, function(err, student){
 	if(err) {
 		console.log(req.params.id);
 		res.redirect('/students');
 	}else{
 		comment.create(req.body.comment, function(err, comment){
 			if(err){
 				console.log(err);
 			}else{
 				comment.author.id = req.user._id,
 				comment.author.username = req.user.username;
 				comment.save();
 				student.comments.push(comment);
 				student.save();
 				res.redirect('/students/' + student._id);
 			}
 		});
 		}
 	});
});


// DELETE ROUTE

//Delete comment
router.delete('/:commentid', middleware.isLoggedIn, function(req,res){
	comment.findByIdAndRemove(req.params.commentid, function(err) {
	student.findById(req.params.id, function(err) {
	    if (err){
	    	res.redirect('/students/' + req.params.id);
	    } else {
	    	res.redirect('/students/' + req.params.id);
	    }
	})
  });
})

// NOT FOUND ROUTE

router.get('*', function(req, res) {
	res.send('Page does not exist');	
})

module.exports = router;