(function() {

	var POPOVERS = {
		oauth: new Dialog('#oauth-popover'),
		selectRoom: new Dialog('#select-room-popover')
	};

	$('#sign-in button')[0].on('click', GoogleAuth.handleAuthClick);
	$('#oauth-popover header button')[0].on('click', function () {
		POPOVERS.oauth.hide();
	});

	GoogleAuth.onAuthSuccess = function () {
		Ajax.get('/api/v1/google/resources').then(function (response) {
			console.log('get success');
			POPOVERS.selectRoom.show();

			var roomsList = new AvailableRoomsList(POPOVERS.selectRoom.el.querySelector('ol'));
			roomsList.roomSelectedCallback = function (roomId) {
				POPOVERS.selectRoom.showPage(1);
				//TODO don't manage DOM here
				$('.page.room-name input')[0].value = 'todo';
			};
		}, function (e) {
			console.log('get failed: ' + e);
		})
	};

})();