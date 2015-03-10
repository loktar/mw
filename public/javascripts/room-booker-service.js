(function () {
    window.RoomBookerService = function () {

    };

    RoomBookerService.prototype = {
        bookRoom: function (room, bookerName) {
            var now = new Date();
            var startTime = now.toISOString();
            var endTime = new Date(now.getTime() + 30 * 60 * 1000);

            var requestPromise = gapi.client.calendar.events.insert({
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
            });

            return requestPromise;
        }
    };
})();