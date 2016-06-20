// grab the mongoose module
var mongoose =require('mongoose');

var ExamSchema = new mongoose.Schema({
	name: {type: String, default: 'Exam'},
	complete: {type: Date, default: new Date()},
	questions: [String],
	time: {type: Number, default: 60},
	submitter: {type: String, default: 'Professor'}
	
});

module.exports = mongoose.model('Exam', ExamSchema);