var ajaxAndPromises = ajaxAndPromises || {};

ajaxAndPromises.dropboxapifacade = function (secretKey)
{
    var baseContentServiceUrl = 'https://api-content.dropbox.com/1/';
    var baseServiceUrl = 'https://api.dropbox.com/1/';

    if (secretKey === null || typeof secretKey === 'undefined') 
        throw 'no secret key provided';

    var secretPromise = $.ajax({
        cache: false,
        url: baseServiceUrl + 'oauth2/token?code=' + secretKey + '&grant_type=authorization_code&client_id=xedc2581vk0j4fb&client_secret=qu6m999nelcj3ny',
        dataType: 'json',
        method: 'POST'
    });

    var getDownloadLink = function (context, path, token, success, fail)
    {
        var url = baseServiceUrl + 'media/auto' + path;

        var promise = $.ajax({
            cache: false,
            headers: { 'Authorization': 'Bearer ' + token },
            url: url,
            method: 'POST',
            dataType: 'json',
            context: context || this
        });

        promise.done(success);

        return promise;
    }

    return {
        metadata: function (context, path, success, fail)
        {
            var url = baseServiceUrl + 'metadata/auto/' + path;

            var self = this;

            secretPromise.done(function (data) {
                var promise = $.ajax({
                    cache: false,
                    headers: { 'Authorization': 'Bearer ' + data.access_token },
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                    context: context || this
                });

                var token = data.access_token;

                promise.then(function (data) {
                    var promises = [];

                    var ajaxContext = this;

                    $.each(data.contents, function (i, v) {
                        if (v.mime_type) {
                            promises.push(getDownloadLink(context, v.path, token, function (data) {
                                v.downloadUrl = data.url
                            }, function () { }));
                        }
                    });

                    $.when.apply(this, promises).done(function () {
                        success.call(ajaxContext, data)
                    }, function () { });
                }, fail);
            });
        },

        upload: function (context, path, file, success, fail)
        {
            var url = baseContentServiceUrl + 'files_put/auto' + path;

            secretPromise.done(function(data){
                var promise = $.ajax({
                    cache: false,
                    headers: { 'Authorization': 'Bearer ' + data.access_token },
                    url: url,
                    method: 'PUT',
                    dataType: 'json',
                    context: context || this,
                    data: file,
                    processData: false,
                    contentType: false
                });

                var token = data.access_token;

                promise.then(function (data) {
                    var ajaxContext = this;

                    var urlPromise = getDownloadLink(this, data.path, token, function (urlData) {
                        data.downloadUrl = urlData.url
                    }, function () { });

                    $.when(urlPromise).done(function () {
                        success.call(ajaxContext, data)
                    }, function () { });
                }, fail);
            });
        }
    }
}