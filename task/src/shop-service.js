angular.module('mymodule')
		.factory('shopService', function () {
		    var shops = [{
		        id: 1,
		        name: 'shop1',
		        items: [
                    { id: 1, shopId: 1, name: 'product11' },
                    { id: 2, shopId: 1, name: 'product12' },
                    { id: 4, shopId: 1, name: 'product13' },
                    { id: 5, shopId: 1, name: 'product14' },
                    { id: 8, shopId: 1, name: 'product15' }
		        ]
		    },
		    {
		        id: 2,
		        name: 'shop2',
		        items: [
                    { id: 1, shopId: 2, name: 'product21' },
                    { id: 2, shopId: 2, name: 'product22' },
                    { id: 4, shopId: 2, name: 'product23' },
                    { id: 5, shopId: 2, name: 'product24' },
                    { id: 8, shopId: 2, name: 'product25' }
		        ]
		    }];

		    return {
		        getShopsList: function () {
		            return shops;
		        },
		        getShopProducts: function (shopId) {            
		            for (var i = 0, len = shops.length; i < len; i++)
		                if (shops[i].id == shopId)
		                    return shops[i].items;
		        }
		    };
		});