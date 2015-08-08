describe('when using dropbox files list widget', function () {
    before(function () {
        expect = chai.expect;

        $('body').append('<div class="init-form"><div/><ul class="list"></ul>');

        ajaxAndPromises = sinon.stub({ dropboxapifacade: function () { } });
    });

    beforeEach(function () {
        $('.list').html('');
        var self = this;

        this.fakeFacade = sinon.stub({ metadata: function () { }, upload: function () { } });

        this.fakeFacade.upload.restore();
        this.fakeFacade.metadata.restore();

        sinon.stub(this.fakeFacade, 'upload', function (context, path, file, success, fail) {
            success.call(context, { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' });
        });

        sinon.stub(this.fakeFacade, 'metadata',
            function (context, path, success, fail) {
                success.call(context, { path: '/', contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }] })
            }
        );

        ajaxAndPromises.dropboxapifacade.restore();

        sinon.stub(ajaxAndPromises, 'dropboxapifacade', function (options) {
            return self.fakeFacade;
        });
    })

    describe('when creating widget', function () {
        beforeEach(function () {
            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });
        })

        afterEach(function () {
            this.widget.dropboxfileslist('destroy');
            $('.list').html('');
        })

        it('should hide init form', function () {
            //assert
            expect($('.init-form').css('display')).to.equal('none');
        });
        it('should init dropbox api facade with secret key', function () {
            //assert
            expect(ajaxAndPromises.dropboxapifacade.withArgs('key').callCount).to.equal(1);
        });
        it('should initialise item template', function () {
            //assert
            expect($.tmpl("itemTemplate").length).to.equal(1);
        });
        it('should use facade to retrive metadata', function () {
            //assert
            expect(this.fakeFacade.metadata.callCount).to.equal(1);
        });
    });
    describe('when using renderList', function () {
        beforeEach(function () {
        });

        afterEach(function () {
            this.widget.dropboxfileslist('destroy');
            $('.list').html('');
        })

        it('should append items to dom', function () {
            //act  
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/',
                        contents: [{ mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' }]
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            expect($('.list .list__item-file').length).to.equal(5);
            expect($($('.list .list__item-file a')[0]).text()).to.equal('path');
        });
        it('should divide items on folder and files', function () {
            //act		  
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/',
                        contents: [{ mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: null, path: '/path', downloadUrl: 'url' },
                                   { mime_type: undefined, path: '/path', downloadUrl: 'url' },
                                   { mime_type: '', path: '/path', downloadUrl: 'url' }]
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            expect($('.list .list__item-file').length).to.equal(2);
            expect($('.list .list__item-folder').length).to.equal(3);
            expect($('.list .list__item-folder a').attr('href')).to.equal('/path');
            expect($('.list .list__item-file a').attr('href')).to.equal('url?dl=1');
        });
        it('should sort items by type', function () {
            //act
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/',
                        contents: [{ mime_type: null, path: '/path', downloadUrl: 'url' },
                                   { mime_type: '', path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                                   { mime_type: undefined, path: '/path', downloadUrl: 'url' },
                                   { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' }]
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            $('.list li:not(.list__item-uploadForm)').each(function (i, v) {
                if (i < 3) {
                    expect($(v).attr('class')).to.equal('list__item-folder');
                } else {
                    expect($(v).attr('class')).to.equal('list__item-file');
                }
            });
        });
        it('should add item wich provide return back link', function () {
            //act  
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/path',
                        contents: []
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            expect($('.list .list__item-folder').length).to.equal(1);
            expect($('.list .list__item-folder a').text()).to.equal('...');
            expect($('.list .list__item-folder a').attr('href')).to.equal('');
        });
        it('should append upload from to dom', function () {
            //act 
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/path',
                        contents: []
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            expect($('.list .list__item-uploadForm').length).to.equal(1);
        });
        it('should bind events', function () {
            //act		  
            this.fakeFacade.metadata.restore();

            sinon.stub(this.fakeFacade, 'metadata',
                function (context, path, success, fail) {
                    success.call(context, {
                        path: '/path',
                        contents: [{ mime_type: null, path: '/path', downloadUrl: 'url' }]
                    })
                }
            );

            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });

            //assert
            expect($._data($('.list__item-folder a')[0], 'events')).to.have.property('click');
            expect($._data($('#uploadform input')[0], 'events')).to.have.property('change');
        });
    });
    describe('when using appendFile', function () {
        beforeEach(function () {
            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });
        });

        afterEach(function () {
            this.widget = $('.list').dropboxfileslist('destroy');
            $('.list').html('');
        })

        it('should append file item to dom', function () {
            //act
            var event = jQuery.Event('change', { target: { files: [{ name: 'name' }] } });

            $('#uploadform input').trigger(event);

            //assert
            expect($('.list .list__item-file').length).to.equal(1);
            expect($($('.list .list__item-file a')[0]).text()).to.equal('path');
            expect($('.list .list__item-file a').attr('href')).to.equal('url?dl=1');
        });
    });
    describe('when trigering events', function () {
        beforeEach(function () {
            this.widget = $('.list').dropboxfileslist({
                key: 'key'
            });
        });

        afterEach(function () {
            this.widget = $('.list').dropboxfileslist('destroy');
            $('.list').html('');
        })

        it('should clear widget html on folder item click', function () {
            //act
            this.fakeFacade.metadata.restore();
            $('.list__item-folder a').trigger('click');

            //assert
            expect($('.list').html()).to.equal('');
        });
        it('should retrive metadata on folder item click', function () {
            //act
            $('.list__item-folder a').trigger('click');

            //assert
            expect(this.fakeFacade.metadata.callCount).to.equal(2);
        });
        it('should upload file on upload form input change', function () {
            //act
            var event = jQuery.Event('change', { target: { files: [{ name: 'name' }] } });

            $('#uploadform input').trigger(event);

            //assert
            expect(this.fakeFacade.upload.calledOnce).to.equal(true);
        });
        it('should clean value of upload form input', function () {
            //act		  
            var target = $('<input></input>');

            $(target).val('1234');

            target.files = [{ name: 'name' }];

            var event = jQuery.Event('change', { target: target });

            $('#uploadform input').trigger(event);

            //assert
            expect(event.target.val()).to.equal('');
        });
        it('should uppend file to dom', function () {
            //act
            var event = jQuery.Event('change', { target: { files: [{ name: 'name' }] } });

            $('#uploadform input').trigger(event);

            //assert
            expect($('.list .list__item-file').length).to.equal(1);
        });
        it('should show progress message div', function () {
            //act
            var event = jQuery.Event('change', { target: { files: [{ name: 'name' }] } });
            
            $('#uploadform input').trigger(event);

            //assert
            expect($('#uploadform div').css('display')).to.equal('block');
        });
    });
});