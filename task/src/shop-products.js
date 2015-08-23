angular.module('mymodule')
    .controller('shopProductsController', function ($scope) { })
    .directive('shopProducts', ['shopService', 'userService', '$routeParams', function (shopService, userService, $routeParams) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'directives/shop-products.html',
            scope: {},
            link: function (scope, element, args) {
                scope.products = [];

                var products = shopService.getShopProducts($routeParams.shopid);

                for (var i = 0, len = products.length; i < len; i++) {
                    if (!userService.checkLogin() || !userService.getShopItem(products[i].shopId, products[i].id))
                        scope.products.push(products[i]);
                }

                scope.addProductToUserCart = function (product) {
                    if (userService.checkLogin())
                    {
                        userService.addShopProduct(product.shopId, product);

                        scope.products.splice(scope.products.indexOf(product), 1);
                    }
                }
            }
        }
    }]);