angular.module('header')
	.directive('storeHeader',function(){
		return {
			restrict: 'E',
			templateUrl:'js/directives/store-header/store-header.html',
			link: function(scope,element,attr){
			}
		}
	})