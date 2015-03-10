(function () {
    window.Dialog = function (el) {
        this.el = $(el)[0];

        this.showPage(0);
    };

    Dialog.prototype = {
        show: function() {
            this.el.classList.add('shown');
        },

        hide: function() {
            var self = this;

            this.el.classList.remove('shown');

            setTimeout(function () {
                self.reset();
            }, 300);
        },

        reset: function () {
            var forms = this.el.$('form');
            for (var i = 0; i < forms.length; i++) {
                forms[i].reset();
            }
        },

        pages: function () {
            return this.el.querySelectorAll('.page');
        },

        showPage: function(index) {
            var pages = this.pages();
            if (pages) {
                for (var i = 0; i < pages.length; i++) {
                    var page = pages[i];
                    page.style.display = i == index ? '' : 'none';
                }
            }
        }
    }
})();