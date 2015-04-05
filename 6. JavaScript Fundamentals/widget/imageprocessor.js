$.widget('image.imageprocessor', {

    options: {
        defaultSrc: "http://placehold.it/3500x3500&text=default+image!",
    },

    _create: function () {
        var self = this;

        this._showSpinner(this.element);

        var img = new Image();
        $(img).css("width", "500px");
        $(img).css("height", "500px");

        $(img).on("load", function(e){ 
            self._hideSpinner(self.element);
            self.element.replaceWith(img);
        });

        $(img).on("error", function () {
            img.src = self.options.defaultSrc;
        });

        img.src = this.element.context.src;
        
        this.element.removeAttr("src");      
    },

    _showSpinner: function (element) {
        element.css({
            "background-image": "url('spinner.gif')",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });
    },

    _hideSpinner: function (element) {
        element.css({
            "background-image": "none"
        });
    },
});