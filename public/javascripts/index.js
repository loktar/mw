(function() {

	var DIALOGS = {
		oauth: new Dialog('#oauth-dialog'),
		selectRoom: new Dialog('#select-room-dialog')
	};

	$('#sign-in button')[0].on('click', GoogleAuth.handleAuthClick);
	$('#oauth-dialog header button')[0].on('click', function () {
		DIALOGS.oauth.hide();
	});

	GoogleAuth.onAuthSuccess = function () {
		Ajax.get('/api/v1/google/resources').then(function (response) {
			console.log('get success');
			DIALOGS.selectRoom.show();

			var roomsList = new AvailableRoomsList(DIALOGS.selectRoom.el.querySelector('ol'));
			roomsList.roomSelectedCallback = function (roomId) {
				DIALOGS.selectRoom.showPage(1);
				//TODO don't manage DOM here
				$('.page.room-name input')[0].value = 'todo';
			};
		}, function (e) {
			console.log('get failed: ' + e);
		})
	};

})();