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
            expect(cont.has('span.close-button').size()).toEqual(1);
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

});
