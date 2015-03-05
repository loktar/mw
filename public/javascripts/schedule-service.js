(function() {
    window.ScheduleService = function () {

    };

    ScheduleService.prototype = {
        monitorRoom: function (room, callback) {
            var self = this;

            this.room = room;
            this.callback = callback;
            this.fetchSchedule();

            setInterval(function () {
                self.fetchSchedule();
            }, 60 * 1000);
        },

        fetchSchedule: function () {
            var self = this;

            console.log('Fetching room schedule');

            var now = new Date();
            var todayStart = new Date(now.setHours(0, 0, 0, 0));
            var todayEnd = new Date(now.setHours(23, 59, 59, 999));

            var request = gapi.client.calendar.events.list({
                calendarId: this.room.identifier,
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

                        var isEventInProgress = start.getTime() <= now.getTime() && end.getTime() >= now.getTime();
                        self.callback(isEventInProgress);
                    });
                }
            });
        }
    };
})();