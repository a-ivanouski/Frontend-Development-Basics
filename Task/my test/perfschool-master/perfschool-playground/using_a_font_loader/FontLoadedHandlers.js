var FontFaceOnload = require('fontfaceonload');
	var watchLoadedOfFont = function(font) {
		FontFaceOnload(font, {
			success: function() {
				document.documentElement.className += "loaded-" + font;
			}
		});
	}
	watchLoadedOfFont('Lato');