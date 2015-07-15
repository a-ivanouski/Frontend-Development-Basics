describe('DropboxModule ', function() {
  var dropboxService = {};
  beforeEach(module('dropboxModule'));
  beforeEach(inject(function(_dropboxService_){
    dropboxService = _dropboxService_;
  }));

  it('should be able to return the correct link authorization', function(){
      var appKey = [ Math.random() , Math.random() , Math.random() ].join('');
      var correctLink = "https://www.dropbox.com/1/oauth2/authorize?response_type=code&client_id=" + appKey;
      expect(dropboxService.getLinkForToken(appKey)).to.deep.equal(correctLink);
  });
});

