describe('Searchbox', function() {
  it('should reachable by $.fn.searchbox', function() {
    expect($.fn.searchbox).toBeDefined();
    expect(typeof $.fn.searchbox).toBe('function');
  });

  it('should return jQuery object when call', function() {
    var foo = $('<input>').searchbox();
    expect(foo instanceof jQuery).toBe(true);
  });
});
