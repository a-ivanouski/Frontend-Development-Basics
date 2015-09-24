myFramework.initScope(function (scope) {
    scope.currentPath = '';
    scope.showUploadForm = false;

    scope.showSubmitForm = false;
    scope.showDropboxLink = true;

    scope.enableSubmitForm = function () {
        scope.showSubmitForm = true;
        scope.showDropboxLink = false;
    }

    scope.initialiseWidget = function () {
        scope.showSubmitForm = false;

        scope.facade = ajaxAndPromises.dropboxapifacade(scope.secretKey);

        scope.facade.metadata(this, '', scope.createMyCallback(_renderList), function () { });
    }


     function _renderList (data) {
         scope.currentPath = data.path === '/' ? data.path : data.path + '/';

        $.each(data.contents, function (i, v) {
            v.type = v.mime_type ? 'file' : 'folder';

            v.name = v.path.substring(v.path.lastIndexOf('/') + 1, v.path.length);

            v.path = v.mime_type ? v.downloadUrl + '?dl=1' : v.path;
        });

        if (data.path != '/') {
            data.contents.unshift({ type: 'folder', path: data.path.substring(0, data.path.lastIndexOf('/')), name: '...' });
        }

        scope.folders = data.contents.filter(function (i) { return i.type === 'folder' });

        scope.files = data.contents.filter(function (i) { return i.type === 'file' });

        scope.showUploadForm = true;
     };

     scope.openFolder = function (event) {
         event.preventDefault();

         scope.facade.metadata(self, event.target.getAttribute('href'), scope.createMyCallback(_renderList), function () { });
     }

     scope.uploadFile = function (event) {
         event.preventDefault();

         scope.uploadCount = scope.uploadCount + 1;

         var path = scope.currentPath + event.target.files[0].name;

         function appendFile(data) {
             data.type = 'file';

             data.name = data.path.substring(data.path.lastIndexOf('/') + 1, data.path.length);

             data.path = data.downloadUrl + '?dl=1';

             scope.files.push(data);
         }

         scope.facade.upload(self, path, event.target.files[0], scope.createMyCallback(function (data) {
             appendFile(data);
             scope.uploadCount = scope.uploadCount - 1;
         }), function () { });
     }
});