angular.module('mymodule')
    .directive('carList', ['carService', function (carService) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/car-list.html',
            scope: {},
            link: function (scope, e, attrs) {
                carService.getCars().then(function (data) {
                    scope.items = data;
                });
            }
        }
    }]);