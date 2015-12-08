var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var studentSchema = mongoose.Schema({
	first: String,
	second: String,
	age: Date,
	sex: String,
	phone: String,
	lab: [{
		type: Schema.Types.ObjectId,
     	ref: 'Lab'
	}]
});

var labSchema = mongoose.Schema({
	labs: Array
})



var Student = mongoose.model('Student', studentSchema);
var Lab = mongoose.model('Lab', labSchema);

dbControl = {
	addStudent: function(db, first, second, age, sex, phone, labs) {

		var tempLab = new Lab({
				labs: labs
		});

		tempLab.save(function(){
			var tempStudent = new Student({
				first: first,
				second: second,
				age: age,
				sex: sex,
				phone: phone,
			})

			tempStudent.lab = tempLab._id;	
			tempStudent.save();
		});
	},


	findAllStudents: function(db, callback) {
		mongoose.connection.on('error', function() {
			console.log('troubles with connection');
		});

		Student
			.find({})
			.populate('lab')
			.exec(function(error, students) {
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
			doc.first = data.body[0].first;
			doc.second = data.body[0].second;
			doc.age = data.body[0].age;
			doc.sex = data.body[0].sex;
			doc.phone = data.body[0].phone;
			var tempLab = new Lab({
				labs: data.body[1]
			});
			tempLab.save(function(){
				doc.lab = tempLab._id;
				console.log(tempLab)
				doc.save();

			})
			
			
			
		})
	}
}

exports.dbControl = dbControl;