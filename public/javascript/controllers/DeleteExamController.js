

angular.module('DeleteExamController', []).controller('DeleteExamController', function($scope, ExamServices){
	
	$scope.displayExams = function(){
		ExamServices.getAllExams()
		.success(function(data){
			$scope.exams = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: '+ data);
		});
	};

	$scope.init = 'Delete Exam';
	$scope.displayExams();

	$scope.removeExam = function(examid){

		ExamServices.deleteExam(examid)
		.success(function(){
			$scope.displayExams();
		})
		.error(function(data){
			console.log('Error: '+data);
		});
	}
});
