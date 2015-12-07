var mongoose = require('mongoose');		
var mongo_server = 'mongodb://localhost/students';
var async = require('async')


var studentSchema = mongoose.Schema({
				first: String,
				second: String,
		   		age: Date,
		   		sex: String,
		   		phone: Number,
		   		labs: {
		   			informatics: Number,
		   			web: Number,
		   			mathlogic: Number,
		   			history: Number,
		   			databases: Number,
		   			electro: Number
		   		}
		   		
			});
var Student = mongoose.model('Student', studentSchema);


dbControl = {
	addStudent: function(first, second, age, sex, phone, infor, web,  math, history, databases, electro){

		mongoose.connect(mongo_server);
		var db = mongoose.connection;
		db.once('open', function(){
			var tempStudent = new Student({
				first: first,
				second: second,
				age: age,
				sex: sex,
				phone: phone,
				labs: {
					informatics: infor,
		   			web: web,
		   			mathlogic: math,
		   			history: history,
		   			databases: databases,
		   			electro: electro
				}
				
			})
			console.log(tempStudent);
			tempStudent.save();
			mongoose.disconnect();
		})
		
	}, 
	findAllStudents: function(callback){
	
			mongoose.connect(mongo_server);
			var db = mongoose.connection;

			db.once('open', function(){
				Student.find(function(error, students){
					if(error){
						console.log('ERROR: ' + error);
						mongoose.disconnect();
					} else {
						mongoose.disconnect();
            callback(students);
				}
				
			})
				
			})
			


	},
	remove: function(id){
		mongoose.connect(mongo_server);
		var db = mongoose.connection;
		db.once('open', function(){
			var query = Student.find().remove({_id: id});
			query.exec();
			mongoose.disconnect();
		})
		
	}, 
	findOne: function(id, callback){
		mongoose.connect(mongo_server);
		var db = mongoose.connection;
		db.once('open', function(){
			Student.findById(id, function(err, student){				
				mongoose.disconnect();		
        callback(student);        
			})
			
		})
		
	},
	update: function(id, data){
		mongoose.connect('mongodb://localhost/students');
		var db = mongoose.connection;
		db.once('open', function(){
			console.log('nedoen!')
			Student.findById(id, function(err, doc){
				doc.first = data.body.first;
				doc.second = data.body.second;
				doc.age = data.body.age;
				doc.sex = data.body.sex;
				doc.labs.informatics = data.body.infor;
				doc.phone = data.body.phone;
		   		doc.labs.web = data.body.web;
		   		doc.labs.mathlogic = data.body.math;
		   		doc.labs.history = data.body.history;
		   		doc.labs.databases = data.body.databases;
		   		doc.labs.electro = data.body.electro;
				doc.save();
				mongoose.disconnect();
			})
			
		})
		
	}
}

exports.dbControl = dbControl;