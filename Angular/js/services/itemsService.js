angular.module('data')
	.factory('itemsService', ['$q', function ($q) {

		var items = [
			{
				value: 1,
				isSelect: false,
			},
			{
				value: 2,
				isSelect: false,
			},
			{
				value: 3,
				isSelect: false,
			},
			{
				value: 4,
				isSelect: false,
			},
			{
				value: 5,
				isSelect: false,
			},
		]

		var selectedItems = [];

		function getItems () {
			var defer = $q.defer();
			defer.resolve(items);
			return defer.promise;
		};

		function getSelectedItems () {
			return selectedItems;
		}

		function addItems (index) {
			selectedItems.push(items[index]);
			items[index].isSelect = true;
		};

		function removeItems (index) {
			selectedItems.splice(items[index],1);
			items[index].isSelect = false;
		};

		return {
			getItems: getItems,
			addItems: addItems,
			removeItems: removeItems,
			getSelectedItems: getSelectedItems,

		}


	}])