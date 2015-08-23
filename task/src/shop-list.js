angular.module('mymodule')
    .controller('shopsListController', function ($scope) { })
    .directive('shopsList', ['shopService', 'userService', function (shopService, userService) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'directives/shops-list.html',
            scope: {},
            link: function (scope, element, args) {
                scope.shops = [];

                scope.addShopToUserCart = function (shop) {
                    if (userService.checkLogin())
                    {
                        userService.addShop(shop);

                        scope.shops.splice(scope.shops.indexOf(shop), 1);
                    }
                }

                scope.$watch(shopService.getShopsList, function (shops) {
                    scope.shops = [];

                    for (var i = 0, len = shops.length; i < len; i++) {
                        if (!userService.checkLogin() || !userService.getUserShopById(shops[i].id))
                            scope.shops.push(shops[i]);
                    }
                });
            }
        }
    }]);