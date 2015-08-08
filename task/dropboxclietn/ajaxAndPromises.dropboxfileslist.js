$.widget('ajaxAndPromises.dropboxfileslist', {

    options: {
        key: null,
        formTemplate: '<li class="list__item-uploadForm"><form id="uploadform"><div style="display: none;">Upload in progress</div><input type="file"></input></form></li>',
        itemTemplate: '<li class="list__item-${type}"><figure><img src="${type}.png"></img></figure><span><a href="${path}" target="_blank">${name}</a></span><span>{{if mime_type }}${mime_type}{{/if}}</span></li>',
        facade: null,
        currentPath: null,
        uploadFormId: 'uploadform',
        uploadCount: 0
    },

    _create: function () {
        $('.init-form').hide();

        this.options.facade = this._initFacade();

        $.template("itemTemplate", this.options.itemTemplate);

        this.options.facade.metadata(this, '', this._renderList, function () { });
    },

    _initFacade: function()
    {
        return ajaxAndPromises.dropboxapifacade(this.options.key);
    },

    _renderList: function (data) {
        this.options.currentPath = data.path === '/' ? data.path : data.path + '/';

        $.each(data.contents, function (i, v) {
            v.type = v.mime_type ? 'file' : 'folder';

            v.mime_type = v.mime_type || false;

            v.name = v.path.substring(v.path.lastIndexOf('/') + 1, v.path.length);

            v.path = v.mime_type ? v.downloadUrl + '?dl=1' : v.path;
        });

        if (data.path != '/') {
            data.contents.unshift({ type: 'folder', path: data.path.substring(0, data.path.lastIndexOf('/')), name: '...', mime_type: false });
        }

        var itemsList = $.tmpl("itemTemplate", data.contents.sort(this._compare));

        $(this.element).append(this.options.formTemplate);
        $(this.element).append(itemsList);

        this._bingEvents();
    },

    _appendFile: function(data)
    {
        data.type = 'file';

        data.name = data.path.substring(data.path.lastIndexOf('/') + 1, data.path.length);

        data.path = data.downloadUrl + '?dl=1';

        var item = $.tmpl("itemTemplate", data);

        $(this.element).append(item);
    },

    _bingEvents: function ()
    {
        var self = this;

        $('.list__item-folder a').on('click', function (e) {
            e.preventDefault();

            $(self.element).html('');

            self.options.facade.metadata(self, $(e.target).attr('href'), self._renderList, function () { console.log(arguments); });
        });

        $('#uploadform input').on('change', function (e) {
            self.options.uploadCount = self.options.uploadCount + 1;

            var path = self.options.currentPath + e.target.files[0].name;

            self.options.facade.upload(self, path, e.target.files[0], function (data) {
                self._appendFile(data);
                self.options.uploadCount = self.options.uploadCount - 1;
                if (self.options.uploadCount == 0)
                    $("#uploadform div").hide();
            }, function () { console.log(arguments); });

            $(e.target).val('');

            $("#uploadform div").show();
        });
    },

    _compare: function (a, b) {
        if (a.mime_type === false && b.mime_type !== false)
            return -1;
        if (a.mime_type !== false && b.mime_type === false)
            return 1;
    }
});