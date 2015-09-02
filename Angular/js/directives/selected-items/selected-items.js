angular.module('selected')
	.directive('selectedItems',function(){
		return {
			restrict: 'E',
			templateUrl:'js/directives/selected-items/selected-items.html',
			link: function(scope,element,attr){
				console.log('selected-items');
			}
		}
	})