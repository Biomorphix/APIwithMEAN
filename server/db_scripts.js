var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	first: String,
	second: String,
	age: Date,
	sex: String,
	phone: String,
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
	addStudent: function(db, first, second, age, sex, phone, infor, web, math, history, databases, electro) {
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
	},


	findAllStudents: function(db, callback) {
		mongoose.connection.on('error', function() {
			console.log('troubles with connection');
		});
		Student.find(function(error, students) {
			if (error) {
				console.log('ERROR: ' + error);
			} else {
				callback(students);
			}
		})
	},


	remove: function(db, id) {
		var query = Student.find().remove({
			_id: id
		});
		query.exec();
	},


	findOne: function(db, id, callback) {
		Student.findById(id, function(err, student) {
			callback(student);
		})
	},


	update: function(db, id, data) {
		Student.findById(id, function(err, doc) {
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

		})
	}
}

exports.dbControl = dbControl;