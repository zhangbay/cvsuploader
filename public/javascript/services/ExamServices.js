angular.module('ExamServices',[]).factory('ExamServices', function($http){

	var examname;

	return{
		get: function(){
			return examname;
		},
		set: function(ename){
			examname = ename;
		},

		getAllExams: function(){
			return $http.get('/api/exam');
		},

		getExam: function(examid){
			return $http.get('/api/exam/'+examid);
		},

		addExam: function(exam){
			return $http.post('/api/exam',exam);
		},

		deleteExam: function(examid){
			return $http.delete('/api/exam/'+examid);
		}

	}
});