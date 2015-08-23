angular.module('mymodule')
    .factory('userService', function () {
        var user = {};

        var checkLoginUser = function () {
            return user.authorised;
        };

        var logon = function (name) {
            user = {
                name: name,
                cart: [],
                authorised: true
            };
        };

        var logout = function () {
            user.authorised = false;
        };

        var getUserName = function () {
            return user.name;
        };

        var addShop = function (shop) {
            user.cart.push({
                id: shop.id,
                name: shop.name,
                items: []
            });
        };

        var getShops = function () {
            return user.cart;
        };

        var addShopProduct = function (shopId, item) {
            var shop = getUserShopById(shopId);
            shop.items.push(item);
        };

        var getUserShopById = function (id) {
            var shop;
            for (var i = 0, len = user.cart.length; i < len; i++) {
                if (user.cart[i].id === id) {
                    shop = user.cart[i];
                }
            }
            return shop;
        };

        var getShopItem = function (shopid, id) {
            var shop = getUserShopById(shopid);

            for (var i = 0, len = shop.items.length; i < len; i++) {
                if (shop.items[i].id == id) {
                    return true;
                }
            }
            return false;
        };

        var removeShop = function (id) {
            var shop;
            for (var i = 0, len = user.cart.length; i < len; i++) {
                if (user.cart[i].id === id) {
                    shop = user.cart[i];

                    user.cart.splice(user.cart.indexOf(shop), 1);
                    break;
                }
            }
        }

        var removeShopProduct = function (shopid, id)
        {
            var shop = getUserShopById(shopid);
            for (var i = 0, len = shop.items.length; i < len; i++) {
                if (shop.items[i].id === id) {
                    item = shop.items[i];

                    shop.items.splice(shop.items.indexOf(item), 1);
                    break;
                }
            }
        }

        return {
            logon: logon,
            logout: logout,
            checkLogin: checkLoginUser,
            getUserName: getUserName,
            addShop: addShop,
            getShops: getShops,
            addShopProduct: addShopProduct,
            getUserShopById: getUserShopById,
            getShopItem: getShopItem,
            removeShop: removeShop,
            removeShopProduct: removeShopProduct
        };
    })