angular.module('angularRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })

        .when('/addExam',{
        	templateUrl: 'views/addexam.html',
        	controller: 'AddExamController'
        })

        .when('/deleteExam',{
        	templateUrl: 'views/delexam.html',
        	controller: 'DeleteExamController'
        })

        .when('/editExam',{
        	templateUrl: 'views/editexam.html',
        	controller: 'EditExamController'
        })

		.otherwise({
			redirectTo:'/'
		});


	$locationProvider.html5Mode(true);
}]);