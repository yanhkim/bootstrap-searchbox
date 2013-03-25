describe('Searchbox', function() {
    it('should reachable by $.fn.searchbox', function() {
        expect($.fn.searchbox).toBeDefined();
        expect(typeof $.fn.searchbox).toBe('function');
    });

    it('should return jQuery object when call', function() {
        var foo = $('<input>').searchbox();
        expect(foo instanceof jQuery).toBe(true);
    });

    describe('after initializing', function() {
        var box;

        function setup() { return $('<input>').appendTo('body').searchbox(); }
        function teardown(b) { b.remove(); }

        beforeEach(function() {
            box = setup();
        });

        it('should surround input with <div>', function() {
            expect(box.parent().is('div.searchbox-box')).toBe(true);
        });

        it('and containing <div> should be inserted to same position of target', function() {
            var box = $('<input>').appendTo('body'),
                before = box.parent();

            expect(box.searchbox().parent().parent().is(before)).toBe(true);

            box.remove();
        });

        it('has overlay buntton container', function() {
            expect(box.prev().is('span.buttons-container')).toBe(true);
        });

        afterEach(function() {
            teardown(box);
        });

    });
});
