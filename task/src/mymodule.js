angular.module('mymodule', ['ui.router', 'ngRoute'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/")

        $stateProvider
          .state('home', {
              url: "/",
              templateUrl: "views/home.html",
              authRequired: false
          })
          .state('cars', {
              url: "/cars",
              templateUrl: "views/cars.html",
              authRequired: true
          })
          .state('carDetails', {
              url: "/cars/:carId",
              templateUrl: "views/car-details.html",
              authRequired: true
          })
          .state('profile', {
              url: "/profile",
              templateUrl: "views/profile.html",
              authRequired: true
          })
          .state('login', {
              url: "/login",
              templateUrl: "views/login.html",
              authRequired: false
          })
    }]);