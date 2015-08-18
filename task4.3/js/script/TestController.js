'use strict';

angular.module('testModule',[])
	.controller('testController',function($scope){
		$scope.value = 'value';

		$scope.func = function(){
			return false;
		};
	});