$.widget('image.imageprocessor', {

    options: {
        defaultSrc: "http://placehold.it/3500x3500&text=default+image!",
    },

    _create: function () {
        var self = this;

        this._showSpinner(this.element);

        this.element.on("load", function () {
            self._hideSpinner(self.element);
        });

        this.element.on("error", function () {
            self.element.attr("src", self.options.defaultSrc);
        });
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