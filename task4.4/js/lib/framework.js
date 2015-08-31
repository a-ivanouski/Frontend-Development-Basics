
var framework = {

	_instance:{

		//common function sections

		hasOwnProperty: Object.hasOwnProperty,

		createSelfBehavior: function (){
			return {
				name: "",
				constructor: null,
			}
		},

		createEmptyObj: function (){

			return {}
		},

		findElementByAttr: function(nameAttr, name, elements){
			//var arrElements = Array.prototype.slice.call(elements,0);
			return elements.filter(function(item){
				return item.attributes[nameAttr].value === name;
			});
		},

		// ftramework sections

		behaviors: {},

		elements: [],

		arraySelfs: [],

		getValueByAttr: function (self,attrModel){
			var result = self;
			var arraySelfsAttrModel = attrModel.split('.');

			for (var i = 0; i < arraySelfsAttrModel.length; i++) {

				if(result[arraySelfsAttrModel[i]] !== null && result[arraySelfsAttrModel[i]] !== undefined){
						result = result[arraySelfsAttrModel[i]];
				} else {
					return ""
					//throw "properties is not defined!";
				}
			};

			return result;
		},

		getAttributeValue: function (element,attributeName){

				return element.attributes[attributeName] ? element.attributes[attributeName].nodeValue : null;
		},

		updateClick: function (self,element,attribute,parent){

			attribute = attribute.replace( /\s/g, "").split(/['(',')']/);

			if(self[attribute[0]]){
				var funct = self[attribute[0]];
				var paramsNames = attribute.splice(1);

				var params = [];
				for(var i=0; i < paramsNames.length; i++){
					if(paramsNames[i] !== "")
						params[i] = self[paramsNames[i]];
				}

				element.onclick = function(){
					funct.apply(null,params);
					framework._instance.updateFrameworkModel(self,parent);
				};
			}
		},

		updateShow: function (element,isShow){

			isShow ? element.classList.remove("framework-hide-element") : element.classList.add("framework-hide-element");//
		},

		updateFrameworkModel: function (self,element){
			var innerElements = element.children || [];
			for(var i =0; i< innerElements.length; i++){

				if(this.getAttributeValue(innerElements[i],'behavior')){
					continue;
				}

				var attrModel = this.getAttributeValue(innerElements[i],'framework-model');
				var attrClick = this.getAttributeValue(innerElements[i],'framework-click');
				var attrShow = this.getAttributeValue(innerElements[i],'framework-show');

				if(attrModel){

					innerElements[i].innerHTML = this.getValueByAttr(self,attrModel);
				}

				if(attrClick){
					this.updateClick(self,innerElements[i],attrClick,element)
				}

				if(attrShow){
					this.updateShow(innerElements[i],self[attrShow]);
				}

				this.updateFrameworkModel(self,innerElements[i]);
			}
		}

	},


	render: function (behavior,elements){

		console.log("render " + behavior.name);
		//console.log(elements);
		console.log(elements);
		elements.forEach(function(element){

			var newElement = framework._instance.createEmptyObj();

			behavior.constructor.apply(null,[newElement]);
			framework._instance.arraySelfs.push(newElement);
			framework._instance.updateFrameworkModel(framework._instance.arraySelfs[framework._instance.arraySelfs.length - 1],element);

		})
	},

	createBehavior: function (name,constructor){
		if (this._instance.elements.length === 0) {
			this._instance.elements = document.querySelectorAll('[behavior]');
		};

		if(!this._instance.behaviors[name]){
			this._instance.behaviors[name] = this._instance.createSelfBehavior();
			this._instance.behaviors[name].name = name;
			this._instance.behaviors[name].constructor = constructor;

			//console.log(this._instance.elements.filter);

			this.render(this._instance.behaviors[name],
									this._instance.findElementByAttr('behavior',name,this._instance.elements))
		}
		return this;
	},

	initBehaviors: function(behaviors){
		if (this._instance.elements.length === 0) {
			this._instance.elements = Array.prototype.slice.call(document.querySelectorAll('[behavior]'),0);
		};

		for(var nameBehavior in behaviors){
			if(this._instance.hasOwnProperty.call(behaviors,nameBehavior))
				this.createBehavior(nameBehavior,behaviors[nameBehavior]);
		}
		return this;
	}
}

// window.onload = function(e){
// 	var elements = document.querySelectorAll('[behavior]');
// 	for(var i=0; i<elements.length; i++){

// 		var nameBehavior = framework._instance.getAttributeValue(elements[i],'behavior');
// 		if(framework._instance.behaviors[nameBehavior]){
// 			framework.render(framework._instance.behaviors[nameBehavior],elements[i])
// 		}
// 	}
// }