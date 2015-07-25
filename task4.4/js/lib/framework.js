var model = [];
var behavior = [];

function createSelfBehavior(){
	return {
		name:"",
		_self:{}
	}
}


function createBehavior(name,constructor){
	if(!behavior[name] && constructor instanceof Function){
		behavior[name] = createSelfBehavior();
		constructor.apply(null,[behavior[name]._self,null]);
	}
	else {
		throw new Error("behavior already exist!!!");
	}
}


createBehavior("FirstBehavior", function(self,model){
	self.value = 123;
})

console.log(behavior["FirstBehavior"]._self);

