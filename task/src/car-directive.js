angular.module('mymodule')
    .directive('carItem', function () {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/car.html',
            scope: {
                carItem: '='
            }
        }
    });