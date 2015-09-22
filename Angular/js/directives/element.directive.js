angular.module('elements')
	.directive('element' , function () {
		return {
			restrict: 'E',
			scope: {
				value: '='
			},
			controller: 'menuController',
			templateUrl: 'js/directives/element.html',
			link: function (scope,element, attr) {
			}
		}
	})
 