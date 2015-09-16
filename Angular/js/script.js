angular.module('header', [])
angular.module('menu', [])
angular.module('selected', [])
angular.module('elements', [])
angular.module('available-item', [])

angular.module('store', [
		'header',
		'menu',
		'selected',
		'elements',
		'available-item',
		'ui.router',
		'ngStorage'
	])

angular.module('store')
	.controller('test', ['$scope', '$state', 'login', function ($scope, $state, login) {

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
			.state('cars.id', {
				url: 'cars/:id',
				templateUrl: 'views/selectedCar.html',
				data: {
					'noLogin': true
				},
				resolve: {
					initialData: function() {
					}
				}
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'views/profile.html',

			})

		$urlRouterProvider.otherwise('/home');
	})
	.run(['$rootScope', '$state', '$stateParams', 'SessionService',	function ($rootScope, $state, $stateParams, SessionService) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;

			$rootScope.user = null;

			// Здесь мы будем проверять авторизацию
			$rootScope.$on('$stateChangeStart',	function (event, toState, toParams, fromState, fromParams) {
				SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
			});
		}
	])
	.service('SessionService', ['$injector', function($injector) {

		this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
			var $scope = $injector.get('$rootScope'),
			$sessionStorage = $injector.get('$sessionStorage');

			if (toState.data !== undefined) {
				if (toState.data.noLogin !== undefined && toState.data.noLogin) {

				}
			} else {
				// вход с авторизацией
				if ($sessionStorage.user) {
					$scope.$root.user = $sessionStorage.user;
				} else {
				// если пользователь не авторизован - отправляем на страницу авторизации
				event.preventDefault();
				alert('Please LOGIN');
					$scope.$state.go('home');
				}
			}
		};
		}
	]);

