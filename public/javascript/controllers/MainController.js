angular.module('MainController', []).controller('MainController', function($scope,$location,ExamServices){
	$scope.init = 'Main Page';

	$scope.formData = {};

	$scope.queryExam =  function(){
		ExamServices.set($scope.formData);
		console.log("before "+$scope.formData);
		$scope.formData = {};
		console.log("after " +$scope.formData);
		$location.path('/viewExam');
	};
});