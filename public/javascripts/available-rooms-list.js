(function () {

    window.AvailableRoomsList = function (el) {
        var self = this;
        this.roomSelectedCallback = null;

        $(el)[0].on('click', function (event) {
            var li = event.target;
            var roomId = li.attributes['data-room-id'].value;

            if (self.roomSelectedCallback) {
                self.roomSelectedCallback(roomId);
            }
        });
    };

})();