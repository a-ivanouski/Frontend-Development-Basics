angular.module('mymodule')
		.factory('carService', ['$q', function ($q) {
		    var cars = [{
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 1 it is car 1 it is car 1 it is car 1',
		        name: 'car1',
                id: '1'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 2 it is car 2 it is car 2 it is car 2',
		        name: 'car2',
		        id: '2'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 3 it is car 3 it is car 3 it is car 3',
		        name: 'car3',
		        id: '3'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 4 it is car 4 it is car 4 it is car 4',
		        name: 'car4',
		        id: '4'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 5 it is car 5 it is car 5 it is car 5',
		        name: 'car5',
		        id: '5'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 6 it is car 6 it is car 6 it is car 6',
		        name: 'car6',
		        id: '6'
		    }, {
		        url: 'http://placehold.it/350x150',
		        description: 'it is car 7 it is car 7 it is car 7 it is car 7',
		        name: 'car7',
		        id: '7'
		    }];

		    function _getCars(name) {
		        var deferred = $q.defer();

		        setTimeout(function () {
		            deferred.resolve(cars);
		        }, 1000);

		        return deferred.promise;
		    }

		    function _getCarById(id) {
		        var deferred = $q.defer();

		        setTimeout(function () {
		            deferred.resolve(cars.filter(function (c) { return c.id === id; })[0] || {});
		        }, 1000);

		        return deferred.promise;
		    }

		    return {
		        getCars: _getCars,
		        getCarById: _getCarById
		    };
		}]);