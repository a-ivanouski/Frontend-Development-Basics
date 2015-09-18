angular.module('data', [])
angular.module('elements', ['data'])
angular.module('store', [
 
		'elements',
		'ui.router',
		'ngStorage',
	])

angular.module('store')
	.controller('test', ['$scope', '$state', '$rootScope', '$timeout', function ($scope, $state, $rootScope, $timeout) {


	}])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html',
				data: {
					'noLogin': true
				},
			})
			.state('cars', {
				url: '/cars',
				templateUrl: 'views/cars.html',
				data: {
					'noLogin': true
				},
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'views/profile.html',

			})

		$urlRouterProvider.otherwise('/profile');
	})
	// .run(['$rootScope', 'SessionService', '$sessionStorage',	function ($rootScope, SessionService, $sessionStorage) {

	// 		$rootScope.user = $sessionStorage.user;
	// 		$rootScope.$on('$stateChangeStart',	function (event, toState, toParams, fromState, fromParams) {
	// 			SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
	// 		});
	// 	}
	// ])
	// .service('SessionService', ['$injector', '$state', function($injector, $state) {

	// 	this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
	// 		var $scope = $injector.get('$rootScope'),
	// 		$sessionStorage = $injector.get('$sessionStorage');

	// 		if (toState.data !== undefined) {
	// 			if (toState.data.noLogin !== undefined && toState.data.noLogin) {

	// 			}
	// 		} else {
	// 			if ($sessionStorage.user) {
	// 				$scope.$root.user = $sessionStorage.user;
	// 			} else {
	// 				event.preventDefault();
	// 				alert('Please LOGIN');
	// 				$state.go('home');
	// 			}
	// 		}
	// 	};
	// 	}
	// ]);

