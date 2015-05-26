/*
	CONTROLLERS
*/
weatherApp.controller('mainController', ['$scope', '$log', '$location', 'cityService', function ($scope, $log, $location, cityService) {
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});

	$scope.submit = function () {
		$location.path("/forecast");
	};
}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$routeParams', 'weatherService', 'cityService', function ($scope, $log, $routeParams, weatherService, cityService) {
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '2';
	$scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);
	
	$scope.convertToFahrenheit = function (degK) {
		return Math.round((1.8*(degK -273))+32);
	}
	$scope.convertToDate = function (dt) {
		return new Date(dt * 1000);
	};
	// $scope.convertToIcon = function ()
	// console.log($scope);
}]);
