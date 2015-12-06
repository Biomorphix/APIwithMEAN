var express = require('express')
var bodyParser = require('body-parser');
var dbControl = require('./public/scripts/db_scripts').dbControl;
app = express();

console.log(dbControl)

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/contactlist', function (req, res) {
 	 console.log('I received a GET request');
 	 dbControl.findAllStudents(function(students){
 	 	res.json(students)
 	 })
})

app.post('/contactlist', function(req, res){
	var req = req.body;
	console.log(req)
	dbControl.addStudent(req.first, req.second, req.age, req.sex, req.phone, req.infor, req.web, req.math, req.history, req.db, req.electro);
	res.json('Added!')
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	dbControl.remove(id);
	res.json('Deleted!')
})

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	dbControl.findOne(id, function(data){
		res.json(data);
	})
})

app.put('/contactlist/:id', function(req, res){
	console.log('das')
	var id = req.params.id;
	dbControl.update(id, req);
	res.json('Updated!')
})



app.listen(3000)