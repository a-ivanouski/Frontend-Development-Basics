var fontload = require('fontfaceonload');

var fonts = ['Lato', 'Cardo', 'Roboto', 'Merriweather'];

fonts.forEach(function (v) {
    fontload(v, {
        success: function () {
            var elements = document.getElementsByClassName(v.toLowerCase());

            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add('loaded');
            }
        }
    })
});