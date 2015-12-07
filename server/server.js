
function server(){
	var express = require('express')
	var bodyParser = require('body-parser');
	var dbControl = require('./db_scripts').dbControl;
	var mongoose = require('mongoose');		
	var path = require("path");
	var mongo_server = 'mongodb://weblabs:weblabs@ds053190.mongolab.com:53190/students';
	mongoose.connect(mongo_server);
	var db = mongoose.connection;
	
	
	var port = process.env.PORT || 8080;
	app = express();
	
	app.use('/styles',express.static(path.join(__dirname, '/../client/public/styles')));
	app.use('/controllers',express.static(path.join(__dirname, '/../client/public/controllers')));
	app.use('/scripts',express.static(path.join(__dirname, '/../client/public/scripts')));
	
	
	
	app.use(bodyParser.json());
	
	
	app.get('/contactlist', function (req, res) {
	 	 console.log('I received a GET request');
	 	 dbControl.findAllStudents(db, function(students){
	      res.json(students)
	 	 })
	})
	
	app.post('/contactlist', function(req, res){
		var req = req.body;
		console.log(req)
		dbControl.addStudent(db, req.first, req.second, req.age, req.sex, req.phone, req.infor, req.web, req.math, req.history, req.db, req.electro);
		res.json('Added!')
	});
	
	app.delete('/contactlist/:id', function(req, res){
		var id = req.params.id;
		dbControl.remove(db, id);
		res.json('Deleted!')
	})
	
	app.get('/contactlist/:id', function(req, res){
		var id = req.params.id;
		dbControl.findOne(db, id, function(data){
			res.json(data);
		})
	})
	
	app.put('/contactlist/:id', function(req, res){
		console.log('das')
		var id = req.params.id;
		dbControl.update(db, id, req);
		res.json('Updated!')
	})
	
	app.get('/', function(req, res){
		res.sendFile(path.resolve(__dirname + '/../client/public/index.html'))
	})
	
	app.listen(port, function() {
	    console.log('app is running on http://localhost:' + port);
	});	
}


exports.server = server;