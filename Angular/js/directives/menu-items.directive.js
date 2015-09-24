angular.module('elements')
	.directive('menuItems' , function () {
		return {
			restrict: 'E',
			scope: {},
			controller: 'menuController',
			templateUrl: 'js/directives/menu-items.html',
			link: function (scope,element, attr) {
			}
		}
	})
	.controller('menuController', ['$scope', 'itemsService', function ($scope, itemsService) {
		itemsService.getItems().then(function (items) {
			$scope.items = items;
		})

		$scope.itemsService = {
			addItems: itemsService.addItems,
		}

	}])