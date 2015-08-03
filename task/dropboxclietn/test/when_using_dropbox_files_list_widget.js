describe('when using dropbox files list widget', function () {
    before(function () {
        expect = chai.expect;
        var self = this;

        $('body').append('<div class="init-form"><div/><ul class="list"></ul>');

        ajaxAndPromises = { dropboxapifacade: function () { } };

        this.fakeFacade = sinon.stub({ metadata: function () { }, upload: function () { } });

        sinon.stub(ajaxAndPromises, 'dropboxapifacade', function (options) {
            return self.fakeFacade;
        });
    });

    describe('when creating widget', function () {
        

      it('should hide init form', function ()
      {
          //act
          $('.list').dropboxfileslist({
              key: 'key'
          });

          //assert
          expect($('.init-form').css('display')).to.equal('none');
      });
      it('should init dropbox api facade with secret key', function () {
          //act
          $('.list').dropboxfileslist({
              key: 'key'
          });

          //assert
          expect(ajaxAndPromises.dropboxapifacade.withArgs('key').calledOnce).to.equal(true);
      });
      it('should initialise item template', function () {
          //act
          $('.list').dropboxfileslist({
              key: 'key'
          });

          //assert
          expect($.tmpl("itemTemplate").length).to.equal(1);
      });
      it('should use facade to retrive metadata', function ()
      {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          //assert
          expect(this.fakeFacade.metadata.calledOnce).to.equal(true);
      });
  });
  describe('when using renderList', function () {
      afterEach(function () {
          $('.list').html('');
          this.fakeFacade.metadata.reset();
      });

      it('should append items to dom', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/',
              contents: [{ mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' }]
          });

          //assert
          expect($('.list .list__item-file').length).to.equal(5);
          expect($($('.list .list__item-file a')[0]).text()).to.equal('path');
      });
      it('should divide items on folder and files', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/',
              contents: [{ mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: null, path: '/path', downloadUrl: 'url' },
                         { mime_type: undefined, path: '/path', downloadUrl: 'url' },
                         { mime_type: '', path: '/path', downloadUrl: 'url' }]
          });

          //assert
          expect($('.list .list__item-file').length).to.equal(2);
          expect($('.list .list__item-folder').length).to.equal(3);
          expect($('.list .list__item-folder a').attr('href')).to.equal('/path');
          expect($('.list .list__item-file a').attr('href')).to.equal('url?dl=1');
      });
      it('should sort items by type', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/',
              contents: [{ mime_type: null, path: '/path', downloadUrl: 'url' },
                         { mime_type: '', path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' },
                         { mime_type: undefined, path: '/path', downloadUrl: 'url' },
                         { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' }]
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
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/path',
              contents: []
          });

          //assert
          expect($('.list .list__item-folder').length).to.equal(1);
          expect($('.list .list__item-folder a').text()).to.equal('...');
          expect($('.list .list__item-folder a').attr('href')).to.equal('');
      });
      it('should append upload from to dom', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/path',
              contents: []
          });

          //assert
          expect($('.list .list__item-uploadForm').length).to.equal(1);
      });
      it('should bind events', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/path',
              contents: [{ mime_type: null, path: '/path', downloadUrl: 'url' }]
          });

          //assert
          expect($._data($('.list__item-folder a')[0], 'events')).to.have.property('click');
          expect($._data($('#uploadform input')[0], 'events')).to.have.property('change');
      });
  });
  describe('when using appendFile', function(){
      afterEach(function () { $('.list').html(''); });

      it('should append file item to dom', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('appendFile', { mime_type: 'mime_type', path: '/path', downloadUrl: 'url' });

          //assert
          expect($('.list .list__item-file').length).to.equal(1);
          expect($($('.list .list__item-file a')[0]).text()).to.equal('path');
          expect($('.list .list__item-file a').attr('href')).to.equal('url?dl=1');
      });
  });
  describe('when trigering events', function () {
      beforeEach(function () {
          $('.list').html('');
          this.fakeFacade.metadata.reset();
      });

      before(function () {
          this.fakeFacade.upload.restore();

          sinon.stub(this.fakeFacade, 'upload', function (context, path, file, success, fail) {
              success.call(context, { mime_type: undefined, path: '/path', downloadUrl: 'url' });
          });
      });

      it('should clear widget html on folder item click', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/',
              contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
          });

          $('.list__item-folder a').trigger('click');

          //assert
          expect($('.list').html()).to.equal('');
      });
      it('should retrive metadata on folder item click', function () {
          //act
          var widget = $('.list').dropboxfileslist({
              key: 'key'
          });

          widget.dropboxfileslist('renderList', {
              path: '/',
              contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
          });

          $('.list__item-folder a').trigger('click');

          //assert
          expect(this.fakeFacade.metadata.calledOnce).to.equal(true);
      });
	  it('should upload file on upload form input change', function () {
	      //act
	      var widget = $('.list').dropboxfileslist({
	          key: 'key'
	      });

	      widget.dropboxfileslist('renderList', {
	          path: '/',
	          contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
	      });

	      var event = jQuery.Event('change');

	      event.target = {};
	      event.target.files = [{name: 'name'}];

	      $._data($('#uploadform input')[0], 'events').change[0].handler(event);

	      //assert
	      expect(this.fakeFacade.upload.calledOnce).to.equal(true);
	  });
	  it('should clean value of upload form input', function () {
	      //act
	      var widget = $('.list').dropboxfileslist({
	          key: 'key'
	      });

	      widget.dropboxfileslist('renderList', {
	          path: '/',
	          contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
	      });

	      var event = jQuery.Event('change');

	      event.target = $('<input></input>');
	      event.target.val('test');
	      event.target.files = [{ name: 'name' }];

	      $._data($('#uploadform input')[0], 'events').change[0].handler(event);

	      //assert
	      expect(event.target.val()).to.equal('');
	  });
	  it('should uppend file to dom', function () {
	      //act
	      var widget = $('.list').dropboxfileslist({
	          key: 'key'
	      });

	      widget.dropboxfileslist('renderList', {
	          path: '/',
	          contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
	      });

	      var event = jQuery.Event('change');

	      event.target = {};
	      event.target.files = [{ name: 'name' }];

	      $._data($('#uploadform input')[0], 'events').change[0].handler(event);

	      //assert
	      expect($('.list .list__item-file').length).to.equal(1);
	  });
	  it('should show progress message div', function () {
	      //act
	      var widget = $('.list').dropboxfileslist({
	          key: 'key'
	      });

	      widget.dropboxfileslist('renderList', {
	          path: '/',
	          contents: [{ mime_type: undefined, path: '/path', downloadUrl: 'url' }]
	      });

	      var event = jQuery.Event('change');

	      event.target = {};
	      event.target.files = [{ name: 'name' }];

	      $._data($('#uploadform input')[0], 'events').change[0].handler(event);

	      //assert
	      expect($('#uploadform div').css('display')).to.equal('block');
	  });
  });
});