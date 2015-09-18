angular.module('elements')
	.directive('menuItems' , function () {
		return {
			restrict: 'E',
			controller: 'menuController',
			templateUrl: 'js/directives/menu-items.html',
			link: function (scope,element, attr) {
			}
		}
	})
	.controller('menuController', ['$scope', 'itemsService','selectedService', function ($scope, itemsService, selectedService) {
		$scope.items = [];
		itemsService.getItems().then(function (data) {

			$scope.items = data;

		});


	}])