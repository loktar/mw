(function () {
    window.Dialog = function (el) {
        this.el = $(el)[0];

        this.showPage(0);
    };

    window.Dialog.prototype = {
        show: function() {
            this.el.classList.add('shown');
        },
        hide: function() {
            this.el.classList.remove('shown');
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