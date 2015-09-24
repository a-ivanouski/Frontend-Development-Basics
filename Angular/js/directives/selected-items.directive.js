angular.module('elements')
	.directive('selectedItems', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'js/directives/selected-items.html',
			controller: 'selectedController',
			link: function (scope, element, attr) {

			}
		}
	})
	.controller('selectedController', ['$scope', 'itemsService', function ($scope, itemsService) {
		$scope.items = itemsService.getSelectedItems();
		$scope.itemsService = {
			removeItems: itemsService.removeItems,
		}

	}])