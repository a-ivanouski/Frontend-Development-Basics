angular.module('elements')
	.directive('selectedElement',function(){
		return {
			restrict: 'A',
			scope:{
				value:'='
			},
			templateUrl:'js/directives/selected-element/selected-element.html',
			link: function(scope,element,attr){
			}
		}
	})