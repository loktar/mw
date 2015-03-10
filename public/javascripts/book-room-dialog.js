(function () {
    window.BookRoomDialog = function(el) {
        this.dialog = new Dialog(el);

        $(el)[0].$('header button.close')[0].on('click', this.hide.bind(this));
    };

    BookRoomDialog.prototype = {
        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    }
})();