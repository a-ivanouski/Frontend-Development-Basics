if (!window.location.hash) {

    var APP_KEY = '1jgu22rx35z8ys4';

    function random_string() {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        var s = '';
        for (var i = 0; i < 22; i++) {
            s += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return s;
    }

    function get_redirect_uri() {
        return window.location.href.substring(0, window.location.href.length - window.location.hash.length).replace(/\/$/, '');
    }


    var csrf = random_string();
    cookie.set('csrf', csrf);
    window.location = 'https://www.dropbox.com/1/oauth2/authorize?client_id='
        + encodeURIComponent(APP_KEY)
        + '&state=' + encodeURIComponent(csrf)
        + '&response_type=token&redirect_uri=' + encodeURIComponent(get_redirect_uri());
}