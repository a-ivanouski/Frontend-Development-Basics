framework
	.initBehaviors({
				"frameworkModelBehavior": function(self){
					self.value = "This is my framework value!!!";
				},


				"frameworkModelObjectBehavior": function(self){
					self.obj = {
						value: {
							value: "This is obj.value.value"
						}
					};
				},

				"frameworkClickBehavior": function(self){
					var tmp = false;
					self.click = function(){
						tmp = !tmp;
						self.valueClick = tmp ? "Click" : "Not click";
					}
					self.click();
				}
	})
	.createBehavior("frameworkShowBehavior", function(self){
		self.showBlock = false;
		self.show = function(){
			self.showBlock = !self.showBlock;
		}
	})