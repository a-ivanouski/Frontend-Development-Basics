$.widget('image.imageprocessor', {

    options: {
        defaultSrc: "http://placehold.it/3500x3500&text=default+image!",
    },

    _create: function () {
        var self = this;

        this._showSpinner(this.element);

        this.element.on("error", function () {
            self.element.attr("src", self.options.defaultSrc);
        });

        var setIntervalId;

        var monitorImageState = function(){
            if (self._isLoadingComplete()) {
                self._hideSpinner(self.element);
                clearInterval(setIntervalId);
            }
        }

        setIntervalId = setInterval(monitorImageState, 100);
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

    _isLoadingComplete: function () {
        return this.element.complete;
    }
});