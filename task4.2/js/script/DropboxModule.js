'use strict';

angular.module('my', ['dropboxModule'])
    .controller('contr', ['$scope', '$http', 'dropbox-service', function ($scope, $http, dropboxService) {
        console.log(1);
        $scope.token = '';

        $scope.hideContent = false;

        $scope.InfoDropbox = {
            name: '',
            email: '',
        };

        $scope.CurrentFolder = {
            path: '',
            files: [],
        }

        $scope.authorize = function () {
            window.open(dropboxService.getLinkForToken('1jgu22rx35z8ys4'), "_blank", "top=200, left=300, width=800, height=500");
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
            dropboxService.getPromiseToken($scope.secret,'1jgu22rx35z8ys4','yhewhb4kn7uo9gb')
            .then(function (info) {

                $scope.token = info.data.access_token;
                $scope.hideContent = true;

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
    