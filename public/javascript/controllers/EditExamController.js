angular.module('EditExamController', []).controller('EditExamController', function($scope,ExamServices,$http){
	console.log("here edit");
	$scope.init = 'Edit Exam';
	$scope.examId   = null;
	$scope.selected = false;
	$scope.info = {};
	$scope.question = 0;
	$scope.opt = -1;
	$scope.questparam = {};
	$scope.questparam.aoptions = [];

	

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

	$scope.reload = function(){

		ExamServices.getExam($scope.examId)
				.success(function(data){
						$scope.examInfo = data;
						$scope.info.submitter=$scope.examInfo.submitter;
				})
				.error(function(data){
					console.log('Error: '+data);
				});
	}

	$scope.editID =  function(){
			if ($scope.examId != null){
			$scope.selected = true;
			$scope.reload();
		}
	}

	$scope.updateMain = function(){
		$http({
			method : 'PUT',
			url : '/api/exam/'+$scope.examId,
			data: $scope.info
		}).success(function(data){
			alert($scope.examInfo.name+ " has been updated.");
			console.log(data);
		}).error(function(data){
			console.log('Error: '+data);
		})
	}

	$scope.addQuestion = function(){
		$scope.question = 1;
	}

	$scope.editQuestion = function(){
		$scope.question = 2;
	}

	$scope.deleteQuestion = function(){
		$scope.question = 3;
	}

	$scope.Range = function(start,end){
		var arr = [];
		for (var i = start; i <= end; i++){
			arr.push(i);
		}
		return arr;
	}

	$scope.AddQuestionValidate = function(question){
		for(var i = 0; i < $scope.examInfo.questions.length; i++){
			let examQuestion = $scope.examInfo.questions[i].question;
			if(question === examQuestion){
				alert("The question already exist!");
				return false;
			}
		}

		if(!$scope.questparam.question || !$scope.questparam.solution || $scope.questparam.aoptions.length < 2){
			alert("Please fill out all fields");
			return false;
		}

		for(var i = 0; i < $scope.questparam.aoptions.length; i++ ){
			let opt = $scope.questparam.aoptions[i];
			if(!opt.trim().length){
				alert("Invalid question option");
				return false;
			}
		}

		return true;
	}

	$scope.appendQuestion = function(){
		if($scope.AddQuestionValidate($scope.questparam.question)){
			
			ExamServices.addQuestion($scope.examId,$scope.questparam)
				.success(function(data){
					$scope.questparam = {};
					$scope.questparam.aoptions = [];
					$scope.reload();
					console.log(data);
				})
				.error(function(data){
					console.log('Error: '+data)
				})
		}
	}
});