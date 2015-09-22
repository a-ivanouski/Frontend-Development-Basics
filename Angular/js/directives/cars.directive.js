angular.module('elements')
	.directive('cars' , function () {
		return {
			restrict: 'E',
			scope: {},
			controller: 'menuController',
			templateUrl: 'js/directives/cars.html',
			link: function (scope,element, attr) {
			}
		}
	})
	.controller('carsController', ['$scope', 'itemsService', function ($scope, itemsService) {
		$scope.items = [];
		itemsService.getItems().then(function (data) {

			$scope.items = data;

		});


	}])