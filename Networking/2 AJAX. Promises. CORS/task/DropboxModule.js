angular.module('my', [])
    .controller('contr', ['$scope', '$http', 'dropbox-service', function ($scope, $http, dropboxService) {

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
            dropboxService.getFolderInfo(newPath.length ? newPath : '/')
                .then(saveInfoFolder);
        }

        $scope.toRoot = function () {
            $scope.CurrentFolder.path = 'load';
            $scope.CurrentFolder.files = [];
            dropboxService.getFolderInfo('/')
                .then(saveInfoFolder);
        }

        $scope.downloadFile = dropboxService.downloadFile;

        $scope.GetContent = function (file) {
            if (file.isFolder) {
                $scope.CurrentFolder.path = 'load';
                $scope.CurrentFolder.files = [];
                dropboxService.getFolderInfo(file.path)
                    .then(saveInfoFolder);
            }
        }

        dropboxService.getProfileInfo()
            .then(function (info) {
                $scope.InfoDropbox.display_name = info.data.display_name;
                $scope.InfoDropbox.email = info.data.email;
            });

        dropboxService.getFolderInfo('/')
            .then(saveInfoFolder);

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
        function parseqs(text) {
            var split = text.split('&'), params = {};
            for (var i = 0; i < split.length; i++) {
                var kv = split[i].split('=', 2);
                params[kv[0]] = kv[1];
            }
            return params;
        }

        var params = parseqs(window.location.hash.substring(1));
        var csrf = cookie.get('csrf');
        cookie.remove('csrf');
        var access_token = parseqs(window.location.hash.substring(1)).access_token;

        function sendRequest(method, baseUrl, path) {
            var req = {
                method: method,
                url: path ? baseUrl + path : baseUrl + '/',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                }
            }

            return $http(req)
                .error(function (data, status, headers, config) {
                    alert("error");
                });
        }

        function getProfileInfo() {
            return sendRequest('GET', 'https://api.dropbox.com/1/account/info', '/');
        }


        function getFolderInfo(path) {
            return sendRequest('GET', 'https://api.dropbox.com/1/metadata/auto', path);
        }

        function downloadFile(path) {
            sendRequest('GET', 'https://api.dropbox.com/1/media/auto', path)
                .success(function (data, status, headers, config) {
                    var a = document.createElement("a");
                    a.setAttribute('href', data.url);
                    a.click();
                })
        }

        return {
            getProfileInfo: getProfileInfo,
            getFolderInfo: getFolderInfo,
            downloadFile: downloadFile,
        }
    })