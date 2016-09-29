/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/

//Require express, create a router variable, and import the burger specific model
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var burger = require('../models/burger.js');

//Create a redirect if the route is just the localhost:3000
router.get('/', function(req,res) {
	res.redirect('/burgers')
});

//Create a route for /burgers which updates the client-side html page with dynamically updated handlebars. The data we're displaying is the burgers from our selectAll function
router.get('/burgers', function(req,res) {

	burger.findAll({})
		.then(function(result){
			var hbsObject = {burgers : data}
			res.render('index', hbsObject);
		})

});

//Create a route for creating a new burger. We use the insertOne function and pass in the burger_name value from the form into the burger_name column in the SQL database
router.post('/burgers/create', function(req,res) {

	burger.create({
		burger_name: req.body.burger_name
	})

	res.redirect('/burgers')

});

//Create a route for updating a burger to devoured. We use the updateOne function and change the devoured column to true
router.put('/burgers/update/:id', function(req,res) {
	//The condition is the id for the burger we're updating
	var condition = 'id = ' + req.params.id;

	burger.update({
		devoured: req.body.devoured
	}, {
		where: {id: condition}
	})

});

//This exports the router variable for use in our models
module.exports = router;
