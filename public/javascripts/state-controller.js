(function() {
    window.StateController = function () {
        this.selectedRoom = null;
    };

    StateController.prototype = {
        selectRoom: function (room) {
            this.selectedRoom = room;
            this.update();
        },

        setIsRoomBusy: function (isRoomBusy) {
            this.isRoomBusy = isRoomBusy;
            this.update();
        },

        update: function () {
            var className = 'unauthorized';

            if (this.selectedRoom) {
                if (this.isRoomBusy) {
                    className = 'room-busy';
                } else {
                    className = 'room-available';
                }
            }

            var sections = $('#sections')[0];
            sections.className = className;
        }
    };
})();