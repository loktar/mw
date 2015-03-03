// jsonp callback
function handleClientLoad() {
    GoogleAuth.handleClientLoad();
}

(function () {

    var GOOGLE_CLIENT_ID = '885513253207-14hrlo5vv0tkm9m1qudigtpv1058pbhf.apps.googleusercontent.com';
    var GOOGLE_API_KEY = 'AIzaSyCpx_LVqoGhgxCkB5J5auCBCnBKAEA05kA';
    var GOOGLE_SCOPES = 'https://www.googleapis.com/auth/plus.me';

    window.GoogleAuth = {
        onAuthSuccess: null, // delegate function

        handleClientLoad: function handleClientLoad() {
            gapi.client.setApiKey(GOOGLE_API_KEY);
            window.setTimeout(checkAuth, 1);
        },

        handleAuthClick: function (event) {
            gapi.auth.authorize({
                client_id: GOOGLE_CLIENT_ID,
                scope: GOOGLE_SCOPES,
                immediate: false
            }, handleAuthResult);
            return false;
        }

    };

    function checkAuth() {
        gapi.auth.authorize({client_id: GOOGLE_CLIENT_ID, scope: GOOGLE_SCOPES, immediate: true}, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            makeApiCall();
        } else {
            console.log('auth failed');
            // todo
        }
    }

    function makeApiCall() {
        if (GoogleAuth.onAuthSuccess) {
            GoogleAuth.onAuthSuccess();
        }
        //gapi.client.load('calendar', 'v3');
    }

})();