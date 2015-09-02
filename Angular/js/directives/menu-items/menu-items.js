angular.module('menu')
	.directive('menuItems',function(){
		return {
			restrict: 'E',
			templateUrl:'js/directives/menu-items/menu-items.html',
			link: function(scope,element,attr){
			}
		}
	})