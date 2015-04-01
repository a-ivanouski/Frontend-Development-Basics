$.widget("image.load", {
    _create: function () {
        var element = this;
        element._showSpiner(element);
        this.element.on('load', function () {
            element._show(element);
        });
        this.element.on('error', function () {
            element._showError(element);
        });
    },
    _showSpiner: function (element) {
        element.element[0].style["background-image"] = "url('spiner.gif')";
        element.element[0].style["background-size"] = "100% 100%";
    },
    _showError: function (element) {
        element.element[0].src = 'error.jpg';
    },
    _show: function (element) {
        element.element[0].style["background-size"] = "none";
    }

});


