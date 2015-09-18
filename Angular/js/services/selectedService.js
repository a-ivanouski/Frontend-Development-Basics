angular.module('data')
	.service('selectedService', [function () {
			var items = [];

			this.addItems = function (item) {
				items.push(item);
			};
			this.removeItems = function (index) {
				items.splice(index,1);
			};
			this.getSelectedItems = function () {
				return items;
			};
			
		}])