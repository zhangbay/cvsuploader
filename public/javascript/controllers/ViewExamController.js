angular.module('ViewExamController', []).controller('ViewExamController', function($scope,ExamServices){
	$scope.examId   = null;
	$scope.selected = false;

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


	$scope.updateID = function(){
		if ($scope.examId != null){
			$scope.selected = true;

			ExamServices.getExam($scope.examId)
				.success(function(data){
						$scope.examInfo = data;
						if ($scope.examInfo.markAvg === -1){
							$scope.average = "N/A";
						}else{
							$scope.average = $scope.examInfo.markAvg;
						}
						console.log(data);
				})
				.error(function(data){
					console.log('Error: '+data);
				});	
		}
		//console.log($scope.examId);
	}
});