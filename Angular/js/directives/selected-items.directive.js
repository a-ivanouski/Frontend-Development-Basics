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
	.controller('selectedController', ['$scope', 'selectedService', function ($scope, selectedService) {
		$scope.selectedService = selectedService;
		$scope.items = $scope.selectedService.getSelectedItems();

	}])