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
        this.options = options;
        this.element = $(element);
        this.init();
    };

    Searchbox.prototype = {
        init: function() {
            var parent = this.element.parent();
            $('<div class="searchbox-box">').appendTo(parent)
                .append(this.element)
                .append($('<span class="buttons-box">')
                    .append($('<span class="search-button icon-search">'))
                    .append($('<span class="close-button">&times;</span>')));
        },
        remove: function() {
            this.element.parent().remove().end();
        }
    };

    var old = $.fn.searchbox;

    $.fn.searchbox = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('searchbox'),
                options =typeof option === 'object' && option;
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
