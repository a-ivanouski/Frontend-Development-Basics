describe('Tests for DropboxModule:', function() {
  var dropboxService = {};
  var $httpBackend;

  var secret = 'secret';
  var appKey = 'appKey';
  var appSecret = 'appSecret';
  var access_token = 'access_token';

  var authorization = 'Bearer access_token';

  var responseAccessToken = {
        access_token: 'access_token',
      };

  var responseProfileInfo = {
        display_name: 'display_name',
        email: 'email'
      };

  var responseFolderInfo = {
      path: 'Folder',
      contents: ['file1','file2','file3']
  };

  var responseDownloadFile = {
      url: 'url'
  };

  var urlForToken = 'https://api.dropbox.com/1/' + 'oauth2/token?code=' + secret + '&grant_type=authorization_code&client_id=' + appKey + '&client_secret=' + appSecret;
  var urlForProfileInfo = 'https://api.dropbox.com/1/account/info/';
  var uarForFolderInfo = 'https://api.dropbox.com/1/metadata/auto/Folder'; 
  var urlForDownloadFile = 'https://api.dropbox.com/1/media/auto/file';

  function registerRquest(method,url,response,authorization){
      $httpBackend.when(method,url)
        .respond(function(method, url, data, headers){
          expect(authorization).to.deep.equal(headers.Authorization);
          return [200 , response];
        });
  }

  beforeEach(module('dropboxModule'));
  beforeEach(inject(function(_dropboxService_ , _$httpBackend_){

    dropboxService = _dropboxService_;
    $httpBackend = _$httpBackend_;
  }));

  describe('dropboxService ',function(){

    it('should be able to return the correct link authorization', function(){
      var appKey = [ Math.random() , Math.random() , Math.random() ].join('');
      var correctLink = "https://www.dropbox.com/1/oauth2/authorize?response_type=code&client_id=" + appKey;
      expect(dropboxService.getLinkForToken(appKey)).to.deep.equal(correctLink);
    });

    it('should be able to correctly receive the token', function(){
      registerRquest('POST',urlForToken,responseAccessToken);

      dropboxService.getPromiseToken(secret,appKey,appSecret).then(function(info){
        expect(info.data).to.deep.equal(responseAccessToken);
      });
      $httpBackend.flush();
    });

    it('should be able to correctly receive the profile info', function(){
      registerRquest('GET',urlForProfileInfo,responseProfileInfo,authorization);

      dropboxService.getProfileInfo(access_token).then(function(info){
        expect(info.data).to.deep.equal(responseProfileInfo);
      });
      $httpBackend.flush();
    });

    it('should be able to correctly receive the folder info', function(){
      registerRquest('GET',uarForFolderInfo,responseFolderInfo,authorization);

      dropboxService.getFolderInfo('/Folder',access_token).then(function(info){
        expect(info.data).to.deep.equal(responseFolderInfo);
      });
      $httpBackend.flush();
    });

    it('should be able to correctly receive the url for download file', function(){
      registerRquest('GET',urlForDownloadFile,responseDownloadFile,authorization);

      dropboxService.downloadFile('/file',access_token).then(function(info){
        expect(info.data).to.deep.equal(responseDownloadFile);
      });
      $httpBackend.flush();
    });

  })
});

