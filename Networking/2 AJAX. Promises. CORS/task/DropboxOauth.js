'use strict';

angular.module('dropboxModule', [])
    .factory('dropbox-service', function ($http) {

        function sendRequest(method, baseUrl, path, token) {

            var headers = {
                Authorization: 'Bearer ' + token,
            }

            var req = {
                method: method,
                url: path ? baseUrl + path : baseUrl,
            }

            if (token) {
                req.headers = headers;
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

        function getPromiseToken(secret, appKey, appSecret) {
            var url = 'https://api.dropbox.com/1/' + 'oauth2/token?code=' + secret + '&grant_type=authorization_code&client_id=' + appKey + '&client_secret=' + appSecret;
            return sendRequest('POST', url);
        }

        function getLinkForToken(appKey) {
            return "https://www.dropbox.com/1/oauth2/authorize?response_type=code&client_id=" + appKey;
        }

        return {
            getLinkForToken: getLinkForToken,
            getPromiseToken: getPromiseToken,
            getProfileInfo: getProfileInfo,
            getFolderInfo: getFolderInfo,
            downloadFile: downloadFile,
        }
    })
