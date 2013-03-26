(function(root, factory) {
    if (typeof exports !== 'undefined') {
        factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
})(this, function($) {

    var Searchbox = function(element, options) {
        this.element = $(element);
        this.init(options);
    };

    var ENTER = $.ui ? $.ui.keyCode.ENTER : 13;

    Searchbox.prototype = {
        init: function(options) {
            var el = this.element,
                parent = el.parent(),
                container = $('<div class="searchbox-box">'),
                buttons = $('<span class="buttons-box">'),
                search = $('<span class="search-button icon-search">'),
                clear = $('<span class="clear-button">&times;</span>');

            search.on('click', function() { el.trigger('search'); });
            clear.on('click', function() { el.trigger('clear'); });
            el.on('keydown', function(e) {
                if (container.hasClass('result-mode')) return;
                if (e.which === ENTER) el.trigger('search');
            });

            if (options.mode === 'result') container.addClass('result-mode');
            if (options.val) el.val(options.val);

            container.append(el, buttons.append(search, clear)).appendTo(parent);
        },
        remove: function() {
            this.element.parent().remove();
        },
        'toggle-mode': function() {
            this.element.parent().toggleClass('result-mode');
        },
        'search-mode': function() {
            this.element.parent().removeClass('result-mode');
        },
        'result-mode': function() {
            this.element.parent().addClass('result-mode');
        }
    };

    var old = $.fn.searchbox;

    $.fn.searchbox = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('searchbox'),
                options = typeof option === 'object' && option;
            if (!data) $this.data('searchbox', (data = new Searchbox(this, options)));
            if (typeof option === 'string') data[option]();
        });
    };

    $.fn.searchbox.Constructor = Searchbox;

    $.fn.searchbox.noConflict = function() {
        $.fn.searchbox = old;
        return this;
    };

});
