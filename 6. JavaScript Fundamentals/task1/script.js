function loadImage(id,url) {
    var img = new Image();

    img.onload = function () {
        console.log('correct');
        $('#' + id).attr('src', url);
    }

    img.onerror = function () {
        console.log('error');
        $('#' + id).attr('src', 'error.jpg');
    }
    img.src = url;
}