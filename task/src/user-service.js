angular.module('mymodule')
    .factory('userService', ['userSession', function (userSession) {
        var user = userSession.getUserSession();

        function _checkLoginUser () {
            return user.authorised;
        };

        function _logon (name) {
            user = {
                name: name,
                cars: [],
                authorised: true,
            };

            userSession.updateUserSession(user);
        };

        function _logout () {
            user.authorised = false;
            userSession.clearUserSession();
        };

        function _getUserName () {
            return user.name;
        };

        function _addCar (car){
            user.cars.push(car);

            userSession.updateUserSession(user);
        }

        function _getUserCars () {
            return user.cars;
        }

        function _hasCar(id) {
            return !!user.cars.filter(function (c) {
                return c.id === id;
            })[0];
        }

        return {
            logon: _logon,
            logout: _logout,
            checkLogin: _checkLoginUser,
            getUserName: _getUserName,
            addCar: _addCar,
            getUserCars: _getUserCars,
            hasCar: _hasCar
        };
    }])
    .constant('userSessionDataKey', 'app.usersession')
    .factory('userSession', ['userSessionDataKey', '$window', function (userSessionDataKey, $window) {
        function _getUserSession() {
            return angular.fromJson($window.localStorage.getItem(userSessionDataKey)) || {};
        }

        function _updateUserSession(user) {
            $window.localStorage.setItem(userSessionDataKey, angular.toJson(user));
        }

        function _clearUserSession() {
            $window.localStorage.removeItem(userSessionDataKey);
        }

        return {
            getUserSession: _getUserSession,
            updateUserSession: _updateUserSession,
            clearUserSession: _clearUserSession
        };
    }]).run(['$state', 'userService', '$rootScope', function ($state, userService, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.authRequired && !userService.checkLogin()) {
                event.preventDefault();
                $state.go('login', {}, { reload: true, location: 'replace' });
            }
        })
    }]);