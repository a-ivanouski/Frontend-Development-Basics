
//common function sections

function createSelfBehavior(){
	return {
		name: "",
		constructor: null,
	}
}

function createEmptyObj(){
	return {}
}



// ftramework sections

var behaviors = {};

var array = []

function getValueByAttr(self,attrModel){
	var result = self;
	var arrayAttrModel = attrModel.split('.');

	for (var i = 0; i < arrayAttrModel.length; i++) {

		if(result[arrayAttrModel[i]] !== null && result[arrayAttrModel[i]] !== undefined){
				result = result[arrayAttrModel[i]];
		} else {
			return ""
			//throw "properties is not defined!";
		}
	};

	return result;
}


function getAttributeValue(element,attributeName){
		return element.attributes[attributeName] ? element.attributes[attributeName].nodeValue : null;
}

function updateClick(self,element,attribute,parent){

	attribute = attribute.replace( /\s/g, "").split(/['(',')']/);

	if(self[attribute[0]]){
		var funct = self[attribute[0]];
		var paramsNames = attribute.splice(1);

		var params = [];
		for(var i=0;i<paramsNames.length;i++){
			if(paramsNames[i] !== "")
				params[i] = self[paramsNames[i]];
		}

		element.onclick = function(){
			funct.apply(null,params);
			updateFrameworkModel(self,parent);
		};
	}
}

function updateShow(element,isShow){
	isShow ? element.classList.remove("framework-hide-element") : element.classList.add("framework-hide-element");//
}

function updateFrameworkModel(self,element){
	var innerElements = element.children || [];
	for(var i =0; i< innerElements.length; i++){

		if(getAttributeValue(innerElements[i],'behavior')){
			continue;
		}

		var attrModel = getAttributeValue(innerElements[i],'framework-model');
		var attrClick = getAttributeValue(innerElements[i],'framework-click');
		var attrShow = getAttributeValue(innerElements[i],'framework-show');

		if(attrModel){

			innerElements[i].innerHTML = getValueByAttr(self,attrModel);
		}

		if(attrClick){
			updateClick(self,innerElements[i],attrClick,element)
		}

		if(attrShow){
			updateShow(innerElements[i],self[attrShow]);
		}

		updateFrameworkModel(self,innerElements[i]);
	}
}

function render(behavior,element){

	console.log("render " + behavior.name);

	var newElement = createEmptyObj();
 
	behavior.constructor.apply(null,[newElement]);
	array.push(newElement);
	updateFrameworkModel(array[array.length-1],element);
}

function createBehavior(name,constructor){

	if(!behaviors[name]){
		behaviors[name] = createSelfBehavior();
		behaviors[name].name = name;
		behaviors[name].constructor = constructor;
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