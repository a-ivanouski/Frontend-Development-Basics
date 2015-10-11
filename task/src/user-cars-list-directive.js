angular.module('mymodule')
    .directive('userCarsList', ['userService', function (userService) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/user-cars-list.html',
            scope: {},
            link: function (scope, e, attrs) {
                scope.items = userService.getUserCars();
            }
        }
    }]);