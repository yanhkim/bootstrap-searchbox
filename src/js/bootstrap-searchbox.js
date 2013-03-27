(function(root, factory) {
    if (typeof exports !== 'undefined') {
        factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
})(this, function($) {

    var ENTER = $.ui ? $.ui.keyCode.ENTER : 13;

    var Searchbox = function(element, options) {
        this.element = $(element);
        this.init(options);
    };

    Searchbox.prototype = {
        init: function(options) {
            var el = this.element,
                parent = el.parent(),
                container = $('<div class="searchbox-box">'),
                searchIcon = $('<span class="icon-search">'),
                clearButton = $('<div class="clear-button">&times;</div>');

            clearButton.on('click', $.proxy(this.clear, this));
            el.on('keydown', $.proxy(this.keydown, this));
            el.on('keyup', $.proxy(this.keyup, this));

            container.append(el, searchIcon, clearButton);

            if (options.val) {
                el.val(options.val);
                this.showClear();
            }

            container.appendTo(parent);
        },
        state: function() {
            return this.element.val() ? 'filled' : 'empty';
        },
        clear: function() {
            this.hideClear();
            this.element.val('').trigger('clear');
        },
        keydown: function(e) {
            if (e.which === ENTER) {
                this.element.trigger(this.state() === 'filled' ? 'search' : 'clear');
                return false;
            }
        },
        keyup: function() {
            if (this.state() === 'filled') {
                this.showClear();
            } else {
                this.hideClear();
            }
        },
        showClear: function() {
            this.element.parent().addClass('filled');
        },
        hideClear: function() {
            this.element.parent().removeClass('filled');
        },
        remove: function() {
            this.element.parent().remove();
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
