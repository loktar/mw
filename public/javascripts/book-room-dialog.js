(function () {
    window.BookRoomDialog = function (el) {
        this.dialog = new Dialog(el);

        $(el)[0].$('header button.close')[0].on('click', this.hide.bind(this));
        $(el)[0].$('form')[0].on('submit', this.bookRoom.bind(this));
    };

    BookRoomDialog.prototype = {
        bookRoomCallback: null, // delegate method

        show: function (room) {
            var self = this;

            this.room = room;
            this.dialog.show();

            setTimeout(function () {
                self.bookerNameEl().focus();
            }, 300);
        },

        hide: function () {
            this.dialog.hide();
        },

        bookRoom: function (e) {
            e.preventDefault();

            var bookerName = this.bookerNameEl().value;

            new RoomBookerService().bookRoom(this.room, bookerName)
                .then(function (response) {
                    console.log('Room booked successfully: ' + response);
                }, function (reason) {
                    console.log('Room failed to book:' + reason);
                });

            return false;
        },

        bookerNameEl: function () {
            return this.dialog.el.$('input#booker-name')[0];
        }
    }
})();