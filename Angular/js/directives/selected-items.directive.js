angular.module('elements')
	.directive('selectedItems', function () {
		return {
			restrict: 'E',
			templateUrl: 'js/directives/selected-items.html',
			controller: 'selectedController',
			link: function (scope, element, attr) {

			}
		}
	})
	.controller('selectedController', ['$scope', function ($scope) {


	}])