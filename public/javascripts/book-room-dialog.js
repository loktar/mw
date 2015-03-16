(function () {
    window.BookRoomDialog = function (el, roomBookerService) {
        this.dialog = new Dialog(el);
        this.roomBookerService = roomBookerService;

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
            var self = this;

            e.preventDefault();

            var bookerName = this.bookerNameEl().value;
            this.roomBookerService.bookRoom(this.room, bookerName)
                .then(function () {
                    self.hide();
                }, function () {
                    //todo: show failure message
                });

            return false;
        },

        bookerNameEl: function () {
            return this.dialog.el.$('input#booker-name')[0];
        }
    }
})();