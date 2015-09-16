angular.module('header')
	.directive('storeHeader',['login', function (login) {
		return {
			restrict: 'E',
			templateUrl:'js/directives/store-header/store-header.html',
			link: function(scope,element,attr){
				scope.click = login.LOGIN;

				scope.$watch('$root.user', function (newVal, oldVal) {
					console.log(newVal);
					if(newVal){
						scope.fullName = newVal.fullName;
					}
				})
			}
		}
	}])
	.service('login', ['$state', '$injector', function($state, $injector) {
			var rootScope = $injector.get('$rootScope'),
			$sessionStorage = $injector.get('$sessionStorage');
			this.LOGIN = function() {
				$sessionStorage.user = {
					fullName: 'Patseyuk Dima'
				};
				console.log("LOGIN!!!");
			}
	}])