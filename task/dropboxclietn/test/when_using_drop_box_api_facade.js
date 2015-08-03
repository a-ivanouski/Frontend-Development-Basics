describe('when using drop box api facade', function () {
    before(function () {
        var self = this;

        this.requests = [];

        expect = chai.expect;

        sinon.stub($, 'ajax', function (options) {
            var deferred = $.Deferred();

            if (options.success) deferred.done(options.success({}));

            if (options.error) deferred.fail(options.error({}));

            deferred.success = deferred.done;

            deferred.error = deferred.fail;

            self.requests.push(deferred);

            return deferred;
        });
    });

    afterEach(function () {
        this.requests = [];
        $.ajax.reset();
    });

  describe('when initialising facade', function () {
      it('sholud throw exception if initialised without secret key', function () {
          var self = this;

          //act & assert
          expect(function () {
              ajaxAndPromises.dropboxapifacade()
          }).to.throw('no secret key provided');
      });
      it('should request access key', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret');

          //assert
          expect($.ajax.calledOnce).to.equal(true);
      });
      it('should return right result', function () {
          //act
          var result = ajaxAndPromises.dropboxapifacade('secret');

          //assert
          expect(result).to.be.an('object');
          expect(result).to.have.property('metadata').that.to.be.a('function');
          expect(result).to.have.property('upload').that.to.be.a('function');
      });
  });
  describe('when requesting access key', function(){
      it('should send right request', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret');

          //assert
          expect($.ajax.withArgs({
              cache: false,
              url: 'https://api.dropbox.com/1/oauth2/token?code=secret&grant_type=authorization_code&client_id=xedc2581vk0j4fb&client_secret=qu6m999nelcj3ny',
              dataType: 'json',
              method: 'POST'
          }).calledOnce).to.equal(true);
      });
  });
  describe('when getting metadata', function(){
      it('should send right request', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);

          //assert
          expect(this.requests.length).to.equal(2);

          expect($.ajax.withArgs({
              cache: false,
              url: 'https://api.dropbox.com/1/metadata/auto/path',
              dataType: 'json',
              method: 'GET',
              context: this,
              headers: { 'Authorization': 'Bearer ' + 'access_token' },
          }).calledOnce).to.equal(true);
      });
      it('should use secretpromisse to get access key', function (done) {
          //act
          var facade = ajaxAndPromises.dropboxapifacade('secret');

          this.requests[0].done = function () {
              done();
          }

          facade.metadata(this, 'path', function () { }, function () { });
      });
      it('should request downloadUrl for each item with mime type', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);
          this.requests[1].resolveWith(this, [{
              contents: [
                  { mime_type: 'mime_type', path: '/path' },
                  { mime_type: 'mime_type', path: '/path' },
                  { mime_type: '', path: '/path' },
                  { mime_type: null, path: '/path' },
                  { mime_type: undefined, path: '/path' }
              ]
          }]);

          //assert
          expect(this.requests.length).to.equal(4);

          expect($.ajax.withArgs({
              cache: false,
              headers: { 'Authorization': 'Bearer ' + 'access_token' },
              url: 'https://api.dropbox.com/1/media/auto/path',
              method: 'POST',
              dataType: 'json',
              context: this
          }).callCount).to.equal(2);
      });
      it('should call success callback after requesting downloadurls', function (done)
      {
          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { done(); }, function () { });

          this.requests[0].resolveWith(this, [{}]);
          this.requests[1].resolveWith(this, [{
              contents: [
                  { mime_type: 'mime_type' },
                  { mime_type: 'mime_type' },
                  { mime_type: 'mime_type' },
                  { mime_type: 'mime_type' },
                  { mime_type: 'mime_type' }
              ]
          }]);

          $.each(this.requests.slice(2), function (i, v) {
              v.resolveWith(this, [{}]);
          });         
      })
      it('should call success callback on metadata requesting complition', function (done) {
          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { done(); }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);
          this.requests[1].resolveWith(this, [{contents: []}]);
      });
      it('should call fail callback on request failure', function (done) {
          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { }, function () { done(); });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);
          this.requests[1].reject();
      });
      it('should upply right context', function (done) {
          //arrange
          var self = this;

          //act
          ajaxAndPromises.dropboxapifacade('secret').metadata(this, 'path', function () { expect(this).to.equal(self); done(); }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);
          this.requests[1].resolveWith(this, [{ contents: [] }]);
      });
  });
  describe('when uploading file', function(){
      it('should send right request', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret').upload(this, '/path', 'file', function () { }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);

          //assert
          expect(this.requests.length).to.equal(2);

          expect($.ajax.withArgs({
              cache: false,
              headers: { 'Authorization': 'Bearer ' + 'access_token' },
              url: 'https://api-content.dropbox.com/1/files_put/auto/path',
              method: 'PUT',
              dataType: 'json',
              context: this,
              data: 'file',
              processData: false,
              contentType: false
          }).calledOnce).to.equal(true);
      });
      it('should use secretpromisse to get access key', function (done) {
          //act
          var facade = ajaxAndPromises.dropboxapifacade('secret');

          this.requests[0].done = function () {
              done();
          }

          facade.upload(this, '/path', 'file', function () { }, function () { });
      });
      it('should request downloadUrl for uploaded item', function () {
          //act
          ajaxAndPromises.dropboxapifacade('secret').upload(this, '/path', 'file', function () { }, function () { });

          this.requests[0].resolveWith(this, [{ access_token: 'access_token' }]);
          this.requests[1].resolveWith(this, [{ mime_type: 'mime_type', path: '/path' }]);

          //assert
          expect(this.requests.length).to.equal(3);

          expect($.ajax.withArgs({
              cache: false,
              headers: { 'Authorization': 'Bearer ' + 'access_token' },
              url: 'https://api.dropbox.com/1/media/auto/path',
              method: 'POST',
              dataType: 'json',
              context: this
          }).calledOnce).to.equal(true);
      });
      it('should call success callback on request complition', function (done) {
          //act
          ajaxAndPromises.dropboxapifacade('secret').upload(this, '/path', 'file', function () { done(); }, function () { });

          this.requests[0].resolveWith(this, [{}]);
          this.requests[1].resolveWith(this, [{}]);
          this.requests[2].resolveWith(this, [{}]);
      })
      it('should call fail callback on request failure', function (done) {
          //act
          ajaxAndPromises.dropboxapifacade('secret').upload(this, '/path', 'file', function () { }, function () { done(); });

          this.requests[0].resolveWith(this, [{}]);
          this.requests[1].reject();
      });
      it('should upply right context', function (done) {
          //arrange
          var self = this;

          //act
          ajaxAndPromises.dropboxapifacade('secret').upload(this, '/path', 'file', function () { expect(this).to.equal(self); done(); }, function () { });

          this.requests[0].resolveWith(this, [{}]);
          this.requests[1].resolveWith(this, [{}]);
          this.requests[2].resolveWith(this, [{}]);
      });
  });
});