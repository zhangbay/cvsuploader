var mongoose =require('mongoose');

var QuestionSchema = mongoose.Schema({
	question: {type: String, default: "None"},
	solution: {type: String, default: "None"},
	aoptions: [String],
	exam: {type: mongoose.Schema.Types.ObjectId, ref: 'Exam'}
});

module.exports = mongoose.model('Question', QuestionSchema);