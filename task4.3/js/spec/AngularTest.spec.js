describe('Angular test settings', function() {

  var scope = {};
  beforeEach(module('testModule'));
  beforeEach(inject(function($controller){
  
      var myController = $controller('testController', {
        $scope: scope
      });

      sinon.stub(scope, 'func').returns(true);
  }));

  it('testing scpe and fake Function', function(){
    expect(scope.value).to.deep.equal('value');
    expect(scope.func()).to.be.true;
 
  });
});