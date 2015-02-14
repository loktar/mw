var GOOGLE_CLIENT_ID = '885513253207-14hrlo5vv0tkm9m1qudigtpv1058pbhf.apps.googleusercontent.com';
var GOOGLE_API_KEY   = 'AIzaSyCpx_LVqoGhgxCkB5J5auCBCnBKAEA05kA';
var GOOGLE_SCOPES = 'https://www.googleapis.com/auth/plus.me';

function handleClientLoad() {
	gapi.client.setApiKey(GOOGLE_API_KEY);
	window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: GOOGLE_CLIENT_ID, scope: GOOGLE_SCOPES, immediate: true}, handleAuthResult);
}
    
function handleAuthResult(authResult) {
    var authorizeButton = $('#sign-in button.large')[0];
    if (authResult && !authResult.error) {
//     	alert('auth successful!');
        makeApiCall();
    } else {
    	alert('auth failed');
	    // authorizeButton.onclick = handleAuthClick;
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: GOOGLE_CLIENT_ID, scope: GOOGLE_SCOPES, immediate: false}, handleAuthResult);
	return false;
}

function makeApiCall() {
	Ajax.get('/api/v1/google/resources');
	// gapi.client.load('calendar', 'v3');
}