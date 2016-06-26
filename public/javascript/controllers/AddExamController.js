angular.module('AddExamController', []).controller('AddExamController', function($scope, ExamServices){
	$scope.init = 'Add Exam';
	$scope.exam = {};

	$scope.createExam = function(){
		ExamServices.addExam($scope.exam)
					.success(function(data){
						$scope.exam = {};
						console.log(data);
					})
					.err(function(data){
						console.log('Error: '+ data);
					});
	}
});