/*
	MODULES
*/
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/*
	SERVICE
*/
weatherApp.service('cityService', function(){
	this.city = "Los Angeles, LA";
});

/*
	DIRECTIVES
*/

/*
	CONTROLLERS
*/
weatherApp.controller('mainController', ['$scope', '$log', 'cityService', function ($scope, $log, cityService) {
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', 'cityService', function ($scope, $log, $resource, cityService) {
	$scope.city = cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?", 
		{callback: "JSON_CALLBACK"}, { get: { method:"JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt:2 });

	console.log($scope);
}]);

/*
	ROUTES
*/
weatherApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/main.htm',
        controller: 'mainController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});