angular.module('header',[])
angular.module('menu',[])
angular.module('selected',[])
angular.module('elements',[])
angular.module('available-item',[])


angular.module('store',[
		'header',
		'menu',
		'selected',
		'elements',
		'available-item',
		'ui.router'
	])


angular.module('store')
	.controller('test',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
		console.log(123);
		$state.go('home/items',{value:1});
	}])
	.config(function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('home/items',{
				url:'home/items',
				resolve:{
					initialData: function(){
						console.log('home/items');
					}
				}
			})
			.state('home/items/selected',{
				url:'home/items/selected',
				resolve:{
					initialData: function(){
						console.log('home/items/selected');

					}
				}
			})
		$urlRouterProvider.otherwise("/home/items");
	})
