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
		]

		function getItems () {
			var defer = $q.defer();
			defer.resolve(items);
			return defer.promise;
		}

		return {
			getItems: getItems,
		}


	}])