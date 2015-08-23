﻿angular.module('mymodule')
    .directive('logonForm', ['userService', '$route', function (userService, $route) {
        return {
            replase: true,
            restrict: 'E',
            templateUrl: 'directives/logon.html',
            scope: {},
            link: function (scope, e, attrs) {
                scope.name = '';
                scope.isAuthorised = false;

                scope.login = function (name) {
                    if (name) {
                        userService.logon(name);
                        scope.name = userService.getUserName();
                        scope.isAuthorised = true;
                    }
                }

                scope.logout = function () {
                    userService.logout();
                    scope.isAuthorised = false;
                    scope.name = '';
                    $route.reload();
                }
            }
        }
    }]);