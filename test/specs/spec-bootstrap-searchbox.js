describe('bootstrap-searchbox', function() {
    it('should reachable by $.fn.searchbox', function() {
        expect($.fn.searchbox).toBeDefined();
        expect(typeof $.fn.searchbox).toBe('function');
    });

    it('should return jQuery object when call', function() {
        var foo = $('<input>').searchbox();
        expect(foo instanceof jQuery).toBe(true);
    });

    describe('it\'s markup', function() {
        var box;

        function setup(opts) {
            return $('<input type="text" placeholder="Search" class="search-query">')
                .appendTo('body').searchbox(opts);
        }
        function teardown(b) { b.searchbox('remove'); }

        beforeEach(function() {
            box = setup();
        });

        it('input should be surrounded by <div>', function() {
            expect(box.parent().is('div.searchbox-box')).toBe(true);
        });

        it('and <div> should be inserted to same position of the input', function() {
            var box = $('<input>').appendTo('body'),
                before = box.parent();

            expect(box.searchbox().parent().parent().is(before)).toBe(true);

            box.searchbox('remove');
        });

        it('has overlay search-icon', function() {
            var p = box.parent();
            expect(p.has('.icon-search').size()).toEqual(1);
        });

        it('has overlay clear-buntton', function() {
            var p = box.parent();
            expect(p.has('.clear-button').size()).toEqual(1);
        });

        it('should remove all elements that generated', function() {
            expect($('body').has(box).size()).toEqual(1);
            expect($('body').has(box.parent()).size()).toEqual(1);

            box.searchbox('remove');
            expect($('body').has(box).size()).toEqual(0);
            expect($('body').has(box.parent()).size()).toEqual(0);
        });

        afterEach(function() {
            teardown(box);
        });
    });

    describe('it\'s opertaion', function() {
        var box;

        function setup(opts) {
            return $('<input type="text" placeholder="Search" class="search-query">')
                .appendTo('body').searchbox(opts);
        }
        function teardown(b) { b.searchbox('remove'); }
        function mode(b) {
            var c = b.parent().find('.clear-button');

            //console.info('\n############');
            //console.info(b.val() || 'empty', c.is(':visible'));
            //console.info('############\n');

            if (!b.val() && !c.is(':visible')) {
                return 'empty';
            } else if (b.val() && c.is(':visible')) {
                return 'filled';
            }
        }

        function key(type, code) {
            return function() { return $.Event(type, { which: code }); };
        }

        var enter = key('keydown', 13),
            shift = key('keydown', 16),
            codes = { 'f': 70, 'o': 79, 'bsp': 8 };

        function simkey(box, code) {
            var c = String.fromCharCode(code),
                val = box.val();
            if (code === 8) {
                box.val(val.substr(0, val.length - 1));
            } else {
                box.val(box.val() + c);
            }
            box.trigger(key('keyup', code)());
        }

        function cbutton(box) {
            return box.parent().find('.clear-button');
        }

        beforeEach(function() {
            box = setup();
        });

        it('should support init with value', function() {
            var with_val = setup({ val: 'foobar' });

            expect(mode(box)).toBe('empty');
            expect(mode(with_val)).toBe('filled');
            expect(with_val.val()).toBe('foobar');

            teardown(with_val);
        });

        it('should fire `search` event when ENTER and input was *not* empty', function() {
            var count = 0;
            box.on('search', function() { count++; });

            box.trigger(enter());
            expect(count).toEqual(0);

            box.val('foobar');
            box.trigger(enter());
            expect(count).toEqual(1);

            box.trigger(shift());
            expect(count).not.toEqual(2);
        });

        it('should fire `clear` event when click clear button', function() {
            var count = 0;
            box.on('clear', function() { count++; });

            cbutton(box).click();
            expect(count).toEqual(1);
        });

        it('should fire `clear` event when ENTER and input *was* empty', function() {
            var count = 0;
            box.on('clear', function() { count++; });

            expect(mode(box)).toBe('empty');
            box.trigger(enter());
            expect(count).toEqual(1);
        });

        it('should clear it\'s value when click clear button', function() {
            var filled = setup({ val: 'foobar' });

            expect(mode(filled)).toBe('filled');
            cbutton(filled).click();
            expect(filled.val()).toBe('');
            expect(mode(filled)).toBe('empty');

            teardown(filled);
        });

        it('should alter visiblity of clear button by whether input is empty or not', function() {
            expect(mode(box)).toBe('empty');
            simkey(box, codes.f);
            simkey(box, codes.o);
            simkey(box, codes.o);
            expect(mode(box)).toBe('filled');

            simkey(box, codes.bsp);
            simkey(box, codes.bsp);
            simkey(box, codes.bsp);
            expect(mode(box)).toBe('empty');
        });

        it('should support show|hide functionality', function() {
            var container = box.parent();
            expect(container.is(':visible')).toBe(true);
            box.searchbox('hide');
            expect(container.is(':visible')).toBe(false);
            box.searchbox('show');
            expect(container.is(':visible')).toBe(true);
            box.searchbox('toggle');
            expect(container.is(':visible')).toBe(false);
            box.searchbox('toggle');
            expect(container.is(':visible')).toBe(true);
        });

        afterEach(function() {
            teardown(box);
        });
    });

});
