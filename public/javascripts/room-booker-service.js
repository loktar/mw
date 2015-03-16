(function () {
    window.RoomBookerService = function (stateController) {
        this.stateController = stateController;
    };

    RoomBookerService.prototype = {
        bookRoom: function (room, bookerName) {
            var self = this;

            var now = new Date();
            var startTime = now.toISOString();
            var endTime = new Date(now.getTime() + 30 * 60 * 1000);

            return gapi.client.calendar.events.insert({
                calendarId: room.identifier,
                resource: {
                    summary: "Booked by Marquee",
                    location: room.name,
                    organizer: bookerName,
                    start: {
                        dateTime: startTime
                    },
                    end: {
                        dateTime: endTime
                    }
                }
            }).then(function (response) {
                console.log('Book room succeeded: ' + response);

                var event = JSON.parse(response.body);

                self.stateController.setCurrentEvent(event);
                self.stateController.update();
            }, function (reason) {
                console.log('Book room failed: ' + reason);
            });
        },

        endCurrentMeeting: function (room, event) {
            var self = this;

            // TODO make sure end time is after start time
            var oneSecondAgo = new Date().getTime() - 1000;
            var endTime = new Date(oneSecondAgo);

            return gapi.client.calendar.events.patch({
                calendarId: room.identifier,
                eventId: event.id,
                resource: {
                    end: {
                        dateTime: endTime
                    }
                }
            }).then(function (response) {
                console.log('End current meeting succeeded: ' + response);
                self.stateController.setCurrentEvent(null);
                self.stateController.update();
            }, function (reason) {
                console.log('End current meeting failed: ' + reason);
            });
        }
    };
})();