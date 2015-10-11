angular.module('mymodule')
    .directive('carDetails', ['carService', '$stateParams', 'userService', function (carService, $stateParams, userService) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/car-details.html',
            scope: {},
            link: function (scope, e, attrs) {
                scope.canBuy = !userService.hasCar($stateParams.carId);

                carService.getCarById($stateParams.carId).then(function (data) {
                    scope.carItem = data;
                });

                scope.buyCar = function () {
                    userService.addCar(scope.carItem);

                    scope.canBuy = false;
                }
            }
        }
    }]);