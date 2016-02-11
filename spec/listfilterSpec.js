describe('Test the listfilter object', function() {
  
  var listFilter = new ListFilter(data);

  it('should  initially serve 10 videos', function() {
    expect(listFilter.getCurrentPage().length).toBe(10);
  });

  it('should return one item when filtering by user likes and the word Follow', function() {
    expect(listFilter.getCurrentPage(true, 'Follow').length).toBe(5);
  });

});