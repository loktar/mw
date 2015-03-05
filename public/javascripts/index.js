(function () {

    window.IndexPageController = function () {
        var self = this;

        this.stateController = new StateController();

        this.selectRoomDialog = new SelectRoomDialog('#select-room-dialog');
        this.selectRoomDialog.roomSelectedCallback = this.selectRoom.bind(this);

        $('#sign-in button')[0].on('click', GoogleAuth.handleAuthClick);

        GoogleAuth.onAuthSuccess = function () {
            Ajax.get('/api/v1/google/resources').then(function (response) {
                RoomsStore.setRooms(response);

                console.log('get success');
                self.selectRoomDialog.show();
            }, function (e) {
                console.log('get failed: ' + e);
            })
        };

        this.stateController.update();
    };

    IndexPageController.prototype = {
        selectRoom: function (room) {
            this.selectRoomDialog.hide();

            this.stateController.selectRoom(room);
            $('#room h1')[0].innerHTML = room.name;

            console.log('Did select room: ' + room.name);

            console.log('Requesting room schedule');

            var now = new Date();
            var todayStart = new Date(now.setHours(0, 0, 0, 0));
            var todayEnd = new Date(now.setHours(23, 59, 59, 999));

            var request = gapi.client.calendar.events.list({
                calendarId: room.identifier,
                singleEvents: true,
                orderBy: 'startTime',
                timeMin: todayStart.toISOString(),
                timeMax: todayEnd.toISOString()
            });

            request.then(function (response) {
                if (response.status == 200) {
                    var json = JSON.parse(response.body);

                    json.items.forEach(function (item) {
                        var start = new Date(item.start.dateTime);
                        var end = new Date(item.end.dateTime);

                        var now = new Date();

                        if (start.getTime() <= now.getTime() && end.getTime() >= now.getTime()) {
                            console.log('An event is happening right now');
                        }
                        else {
                            console.log('No events are happening right now');
                        }
                    });
                }
            })
        }
    }

})();