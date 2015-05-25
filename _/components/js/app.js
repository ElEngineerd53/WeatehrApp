/*
	MODULES
*/
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/*
	SERVICE
*/
weatherApp.service('cityService', function() {
	this.city = "";
});

/*
	DIRECTIVES
*/
weatherApp.directive("weatherReport", function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,

		scope: {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});

/*
	CONTROLLERS
*/
weatherApp.controller('mainController', ['$scope', '$log', 'cityService', function ($scope, $log, cityService) {
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', '$routeParams', 'cityService', function ($scope, $log, $resource, $routeParams, cityService) {
	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?", 
		{callback: "JSON_CALLBACK"}, { get: { method:"JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

	$scope.convertToFahrenheit = function (degK) {
		return Math.round((1.8*(degK -273))+32);
	}

	$scope.convertToDate = function (dt) {
		return new Date(dt * 1000);
	};

	// $scope.convertToIcon = function ()
	console.log($scope);
}]);