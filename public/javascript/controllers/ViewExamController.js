angular.module('ViewExamController', []).controller('ViewExamController', function($scope,ExamServices){
	$scope.examId   = null;
	$scope.select;

	if (ExamServices.get() != undefined || ExamServices.get() != null) {
		$scope.examId =ExamServices.get();
	}

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

	$scope.updateID = function(){
		$scope.examId = $scope.select;
		console.log($scope.examId);
	}
});