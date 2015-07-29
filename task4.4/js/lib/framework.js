var behaviors = {};

function createSelfBehavior(){

	return {
		name: "",
		self: {},
	}
}

function getAttributeValue(element,attributeName){

	return element.attributes[attributeName] ? element.attributes[attributeName].nodeValue : null;
}

function updateClick(behavior,element,attribute,parent){

	attribute = attribute.replace( /\s/g, "").split(/['(',')']/);

	if(behavior.self[attribute[0]]){
		var funct = behavior.self[attribute[0]];
		var paramsNames = attribute.splice(1);

		var params = [];
		for(var i=0;i<paramsNames.length;i++){
			if(paramsNames[i] !== "")
				params[i] = behavior.self[paramsNames[i]];
		}

		element.onclick = function(){
			funct.apply(null,params);
			updateFrameworkModel(behavior,parent);
		};
	}
}

function updateShow(element,isShow){
	isShow ? element.classList.remove("framework-hide-element") : element.classList.add("framework-hide-element");//
}

function updateFrameworkModel(behavior,element){
	var innerElements = element.querySelectorAll('*');
	for(var i =0; i< innerElements.length; i++){

		var attrModel = getAttributeValue(innerElements[i],'framework-model');
		var attrClick = getAttributeValue(innerElements[i],'framework-click');
		var attrShow = getAttributeValue(innerElements[i],'framework-show');

		if(attrModel){
			innerElements[i].innerHTML = behavior.self[attrModel];
		}

		if(attrClick){
			updateClick(behavior,innerElements[i],attrClick,element)
		}

		if(attrShow){
			updateShow(innerElements[i],behavior.self[attrShow]);
		}
	}
}

function render(behavior,element){

	console.log("render " + behavior.name);

	updateFrameworkModel(behavior,element);
}

function createBehavior(name,constructor){

	if(!behaviors[name]){
		behaviors[name] = createSelfBehavior();
		behaviors[name].name = name;
		var params = [behaviors[name].self];
		constructor.apply(null,params);
	}
}

window.onload = function(e){
	var elements = document.querySelectorAll('[behavior]');
	for(var i=0; i<elements.length; i++){

		var nameBehavior =  getAttributeValue(elements[i],'behavior');
		if(behaviors[nameBehavior]){
			render(behaviors[nameBehavior],elements[i])
		}
	}
}