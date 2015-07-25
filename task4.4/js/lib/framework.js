var model = [
	{
		prop1:"1111111"
	},
	{
		prop2:"22222222"
	}

];

var behavior = [];

function createSelfBehavior(){
	return {
		name:"",
		_self:{}
	}
}


function createBehavior(name,models,constructor){
	if(!behavior[name] && constructor instanceof Function){

		behavior[name] = createSelfBehavior();
		var params = [behavior[name]._self].concat(models);
		constructor.apply(null,params);
	}
	else {
		throw new Error("behavior already exist!!!");
	}
}


createBehavior("FirstBehavior",[model[0],model[1]], function(self,model1,model2){
	self.value1 = model1.prop1;
	self.value2 = model2.prop2;
})

console.log(behavior["FirstBehavior"]._self);

