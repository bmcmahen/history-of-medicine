jest.dontMock('../flux');

describe('flux', () => {

  it('should construct', () => {
    var Flux = require('../flux');
    var api = {};
    var flux = new Flux(api);
    expect(flux).toBeDefined();
    expect(flux.api).toBe(api);
  });

});
