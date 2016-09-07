// grab the mongoose module
var mongoose =require('mongoose');

var ExamSchema = new mongoose.Schema({
	name: {type: String, default: 'Exam'},
	markAvg: {type: Number, default:'-1.0'},
	status: {type: String, default: 'Incomplete'},
	count: {type: Number, default: 0},
	complete: {type: Date, default: new Date()},
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
	time: {type: Number, default: 60},
	submitter: {type: String, default: 'Unknown Professor'}
	
});

module.exports = mongoose.model('Exam', ExamSchema);