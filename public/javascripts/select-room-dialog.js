(function() {
    window.SelectRoomDialog = function (el) {
        var self = this;

        this.dialog = new Dialog(el);
        this.roomNameEl = $('.page.room-name input')[0];
        this.selectedRoom = null;

        var roomNameForm = $('.page.room-name form')[0];
        roomNameForm.on('submit', function (e) {
            self.roomSelectedCallback(self.selectedRoom);

            e.preventDefault();
            return false;
        });
    };

    SelectRoomDialog.prototype = {
        show: function () {
            var self = this;
            var roomsList = new AvailableRoomsList(this.dialog.el.querySelector('ol'));

            roomsList.roomSelectedCallback = function (roomId) {
                self.dialog.showPage(1);

                self.selectedRoom = RoomsStore.roomForId(roomId);
                self.roomNameEl.value = self.selectedRoom.name;
            };

            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    }
})();