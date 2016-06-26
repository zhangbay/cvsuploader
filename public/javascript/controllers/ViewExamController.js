angular.module('ViewExamController', []).controller('ViewExamController', function($scope,ExamServices){
	$scope.examId = ExamServices.get().text;

	ExamServices.getAllExams()
		.success(function(data){
			$scope.all = data;
			console.log("Success: "+data);
		})
		.error(function(data){
			console.log('Error: '+data);
		});

	ExamServices.getExam($scope.examId)
		.success(function(data){
			$scope.examInfo = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: '+data);
		});
});