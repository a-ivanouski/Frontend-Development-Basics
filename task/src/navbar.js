angular.module('mymodule')
    .directive('navbar', ['userService', '$state', function (userService, $state) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/navbar.html',
            scope: false,
            link: function (scope, e, attrs) {
                scope.logout = function () {
                    userService.logout();
                    scope.isAuthorised = false;
                    scope.name = '';
                    $state.reload();
                }
            }
        }
    }]);