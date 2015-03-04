(function() {
    window.StateController = function () {
        this.selectedRoom = null;
    };

    StateController.prototype = {
        selectRoom: function (room) {
            this.selectedRoom = room;
            this.update();
        },

        update: function () {
            var className = 'unauthorized';

            if (this.selectedRoom) {
                className = 'room-available';
            }

            var sections = $('#sections')[0];
            sections.className = className;
        }
    };
})();