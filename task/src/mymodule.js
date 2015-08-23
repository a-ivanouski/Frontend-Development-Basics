angular.module('mymodule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
          when('/', {
              templateUrl: 'views/shop-list.html',
              controller: 'shopsListController'
          }).
          when('/shop/:shopid', {
              templateUrl: 'views/shop-products.html',
              controller: 'shopProductsController'
          }).
          otherwise({
              redirectTo: '/'
          });
    });