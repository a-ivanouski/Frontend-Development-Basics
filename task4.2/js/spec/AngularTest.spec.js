describe('Testing Angular', function() {

  var scope = {};
  beforeEach(module('testModule'));
  beforeEach(inject(function($controller){
  
      var myController = $controller('testController', {
        $scope: scope
      });

      sinon.stub({}, 'func').returns(true) // Sinon
  }));

  it('testing TestController', function(){
    assert.equal(scope.value, 'value');
    assert.equal(scope.func(), false);
  });
});