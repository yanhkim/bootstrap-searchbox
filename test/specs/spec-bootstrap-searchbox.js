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

        function setup() { return $('<input>').appendTo('body').searchbox(); }
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

        it('has overlay bunttons', function() {
            var cont = box.next();

            expect(cont.is('span.buttons-box')).toBe(true);
            expect(cont.has('span.search-button').size()).toEqual(1);
            expect(cont.has('span.clear-button').size()).toEqual(1);
        });

        it('should remove all elements that generated', function() {
            var box = setup();
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

        function setup(options) { return $('<input>').appendTo('body').searchbox(options); }
        function teardown(b) { b.searchbox('remove'); }
        function mode(b) {
            var s = b.parent().find('.search-button'),
                c = b.parent().find('.clear-button');

            if (s.is(':visible') && !c.is(':visible')) {
                return 'search';
            } else if (!s.is(':visible') && c.is(':visible')) {
                return 'result';
            }
        }

        beforeEach(function() {
            box = setup();
        });

        it('should support various ;) initialize options', function() {
            var alt_mode = setup({ mode: 'result' }),
                with_val = setup({ val: 'foobar' }),
                together = setup({ mode: 'result', val: 'foobar' });

            expect(mode(alt_mode)).toBe('result');
            expect(with_val.val()).toBe('foobar');
            expect(mode(together)).toBe('result');
            expect(together.val()).toBe('foobar');

            teardown(alt_mode);
            teardown(with_val);
            teardown(together);
        });

        it('should fire `search|clear` event when its search|clear button clicked', function() {
            var detect = 0;
            box.on('search clear', function() {
                detect++;
            });

            box.parent().find('.search-button').click();
            box.parent().find('.clear-button').click();

            expect(detect).toBe(2);
        });

        it('should support mode changing', function() {
            expect(mode(box)).toBe('search');
            box.searchbox('toggle-mode');
            expect(mode(box)).toBe('result');
            box.searchbox('toggle-mode');
            expect(mode(box)).toBe('search');

            box.searchbox('result-mode');
            expect(mode(box)).toBe('result');
            box.searchbox('search-mode');
            expect(mode(box)).toBe('search');
        });

        afterEach(function() {
            teardown(box);
        });
    });

});
