createBehavior("FirstBehavior", function(self){

	self.value1 = 'click me!';
	self.value2 = 1;

	self.func = function (v2,v3){
		v2++;
		v3++;
		self.value2 = v2;
		self.value3 = self.value2 + 1;
	}
	self.valueShow = false;
	self.showDivFunc = function(){
		self.valueShow = !self.valueShow;
	}

})

createBehavior("secondBehavior", function(self){

	self.value1 = 'click me!';
	self.value2 = 1;

	self.func = function (v2,v3){
		v2++;
		v3++;
		self.value2 = v2;
		self.value3 = self.value2 + 1;
	}
	self.valueShow = false;
	self.showDivFunc = function(){
		self.valueShow = !self.valueShow;
	}

})