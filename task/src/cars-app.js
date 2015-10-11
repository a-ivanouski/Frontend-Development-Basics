angular.module('mymodule')
    .directive('carsApp', ['userService', function (userService) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/cars-app.html',
            scope: {},
            link: function (scope, e, attrs) {
                scope.name = '';
                scope.isAuthorised = userService.checkLogin();

                if (scope.isAuthorised) {
                    scope.name = userService.getUserName();
                }

                scope.$on('user.login', function () {
                    scope.isAuthorised = true;
                    scope.name = userService.getUserName();
                });

                scope.$on('user.logout', function () {
                    scope.isAuthorised = false;
                });
            }
        }
    }]);