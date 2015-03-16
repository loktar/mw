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
                self.stateController.setIsRoomBusy(true);
                self.stateController.update();
            }, function (reason) {
                console.log('Book room failed: ' + reason);
            });
        }
    };
})();