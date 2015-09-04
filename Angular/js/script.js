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
		login.LOGIN();
		$state.go('home.selectedItems',{id:1})
			.then(function(){
				$state.go('home')
			})


	}])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: 'home/',
				resolve: {
					initialData: function() {
					}
				}
			})
			.state('home.selectedItems', {
				url: 'home/items/:id',
				resolve: {
					initialData: function() {
					}
				}
			})
	})
	.service('login', ['$state', function($state) {
		this.LOGIN = function() {

		}
	}])
