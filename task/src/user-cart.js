angular.module('mymodule')
    .directive('userCart', ['userService', '$route', function (userService, $route) {
        return {
            restrinct: 'E',
            replace: true,
            templateUrl: 'directives/user-cart.html',
            scope: {},
            link: function (scope, elemnt, attrs) {
                scope.isLogin = false;
                scope.shops = [];

                scope.removeShop = function (shop) {
                    userService.removeShop(shop.id);
                    $route.reload();
                }

                scope.removeShopProduct = function (product) {
                    userService.removeShopProduct(product.shopId, product.id);
                    $route.reload();
                }

                scope.$watch(userService.getShops, function (shops) {
                    scope.shops = userService.checkLogin() ? shops : [];
                });

                scope.$watch(userService.checkLogin, function (isLogon) {
                    if (!isLogon) {
                        scope.isLogin = false;
                    } else {
                        scope.isLogin = true;
                    }
                })
            }
        }
    }]);