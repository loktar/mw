(function () {
    window.BookRoomDialog = function(el) {
        this.dialog = new Dialog(el);

        $(el)[0].$('header button.close')[0].on('click', this.hide.bind(this));
    };

    BookRoomDialog.prototype = {
        show: function () {
            var self = this;

            this.dialog.show();

            setTimeout(function () {
                self.dialog.el.$('input#booker-name')[0].focus();
            }, 300);
        },

        hide: function () {
            this.dialog.hide();
        }
    }
})();