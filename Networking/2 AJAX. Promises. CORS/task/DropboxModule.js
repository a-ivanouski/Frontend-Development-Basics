angular.module('my', [])
    .controller('contr', ['$scope', '$http', 'dropbox-service', function ($scope, $http, dropboxService) {
        $scope.token = '';

        $scope.InfoDropbox = {
            name: '',
            email: '',
        };

        $scope.CurrentFolder = {
            path: '',
            files: [],
        }

        $scope.back = function () {
            var path = $scope.CurrentFolder.path, newPath = '', i;

            for (i = path.length; i > 0; i--)
                if (path[i] === '/') {
                    break;
                }
            $scope.CurrentFolder.path = 'load';
            $scope.CurrentFolder.files = [];
            newPath = path.substring(0, i);
            dropboxService.getFolderInfo(newPath.length ? newPath : '/', $scope.token)
                .then(saveInfoFolder);
        }

        $scope.toRoot = function () {
            $scope.CurrentFolder.path = 'load';
            $scope.CurrentFolder.files = [];
            dropboxService.getFolderInfo('/', $scope.token)
                .then(saveInfoFolder);
        }

        $scope.downloadFile = dropboxService.downloadFile;

        $scope.GetContent = function (file) {
            if (file.isFolder) {
                $scope.CurrentFolder.path = 'load';
                $scope.CurrentFolder.files = [];
                dropboxService.getFolderInfo(file.path, $scope.token)
                    .then(saveInfoFolder);
            }
        }

        $scope.initial = function () {
            dropboxService.getToken($scope.secret)
            .then(function (info) {

                $scope.token = info.data.access_token;

                dropboxService.getProfileInfo($scope.token)
                    .then(function (info) {
                        $scope.InfoDropbox.display_name = info.data.display_name;
                        $scope.InfoDropbox.email = info.data.email;
                    });

                dropboxService.getFolderInfo('/', $scope.token)
                   .then(saveInfoFolder);
            })
        }

        function saveInfoFolder(info) {
            $scope.CurrentFolder.path = info.data.path;
            $scope.CurrentFolder.files = [];
            for (var i = 0 ; i < info.data.contents.length; i++) {
                var file = createFileType(info.data.contents[i].path, info.data.contents[i].is_dir);
                $scope.CurrentFolder.files.push(file)
            }
        }

        function createFileType(path, isFolder) {
            return {
                path: path,
                isFolder: isFolder,
            }
        }
    }])
    .factory('dropbox-service', function ($http) {

        function sendRequest(method, baseUrl, path, token) {
            var req = {
                method: method,
                url: path ? baseUrl + path : baseUrl + '/',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
            return $http(req)
                .error(function (data, status, headers, config) {
                    alert("error");
                });
        }

        function getProfileInfo(token) {
            return sendRequest('GET', 'https://api.dropbox.com/1/account/info', '/', token);
        }

        function getFolderInfo(path, token) {
            return sendRequest('GET', 'https://api.dropbox.com/1/metadata/auto', path, token);
        }

        function downloadFile(path, token) {
            sendRequest('GET', 'https://api.dropbox.com/1/media/auto', path, token)
                .success(function (data, status, headers, config) {
                    var a = document.createElement("a");
                    a.setAttribute('href', data.url);
                    a.click();
                })
        }

        function getToken(secret) {
            var req = {
                method: 'POST',
                url: 'https://api.dropbox.com/1/' + 'oauth2/token?code=' + secret + '&grant_type=authorization_code&client_id=1jgu22rx35z8ys4&client_secret=yhewhb4kn7uo9gb',
            }

            return $http(req)
                .error(function (data, status, headers, config) {
                    alert("error");
                });
        }

        return {
            getToken: getToken,
            getProfileInfo: getProfileInfo,
            getFolderInfo: getFolderInfo,
            downloadFile: downloadFile,
        }
    })