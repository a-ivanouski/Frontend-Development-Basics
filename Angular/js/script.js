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
		'ui.router'
	])

angular.module('store')
	.controller('test', ['$scope', '$state', 'login', function ($scope, $state, login) {
		// login.LOGIN();
		// 		$state.go('home')


	}])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html'
			})
			.state('cars', {
				url: '/cars',
				templateUrl: 'views/cars.html'
			})
			.state('cars.id', {
				url: 'cars/:id',
				templateUrl: 'views/selectedCar.html',
				resolve: {
					initialData: function() {
					}
				}
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'views/profile.html'
			})

		$urlRouterProvider.otherwise('/home');
	})

