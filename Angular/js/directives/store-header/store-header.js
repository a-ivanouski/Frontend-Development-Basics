angular.module('header')
	.directive('storeHeader',['login', function (login) {
		return {
			restrict: 'E',
			templateUrl:'js/directives/store-header/store-header.html',
			link: function(scope,element,attr){
				scope.click = login.LOGIN;
			}
		}
	}])
	.service('login', ['$state', function($state) {
			this.LOGIN = function() {
				console.log("LOGIN!!!");
			}
	}])