angular.module('elements')
	.directive('availableItem',function(){
		return {
			restrict: 'A',
			scope:{
				value:'='
			},
			templateUrl:'js/directives/available-item/available-item.html',
			link: function(scope,element,attr){
				scope.selectedElements = [
					'first',
					'second',
					'qwe'
				]
			}
		}
	})