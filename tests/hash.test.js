var { generateHexHash, generateAlphaHash } = require('../functions/hash');
var { filterFromRegEx } = require('../functions/utils');

describe('generateHexHash', () => {
  it('should return a string', () => {
    expect(typeof generateHexHash()).toBe('string');
  });

  it('should return a string of the given length', () => {
    expect(generateHexHash(22).length).toBe(22);
  });

  it('should generate a string of length 16 if no value is passed', () => {
    expect(generateHexHash().length).toBe(16);
  });

  it('should return a different value each time it is called', () => {
    expect(generateHexHash()).not.toEqual(generateHexHash());
  });

  it('should return a string that only includes hex characters', () => {
    var testValues = /^[a-f0-9]*$/g;
    expect(testValues.test(generateHexHash())).toBeTruthy();
  });
});

describe('generateAlphaHash', () => {
  it('should generate a string', () => {
    expect(typeof generateAlphaHash()).toBe('string');
  });

  it('should return a string of the given length', () => {
    expect(generateAlphaHash(46).length).toBe(46);
  });

  it('should return a different value each time it is called', () => {
    expect(generateAlphaHash()).not.toEqual(generateAlphaHash());
  });

  it('should return a string with alpha numeric characters', () => {
    var alphaTest = /^[a-zA-Z0-9]*$/g;
    expect(alphaTest.test(generateAlphaHash())).toBeTruthy();
  });

  it('should ignore characters from the given filter', () => {
    var noLettersTest = /^[0-9]*$/g;
    var noNumbersTest = /^[a-zA-Z]*$/g;
    var noCapsTest = /^[a-z0-9]*$/g;

    var noLettersFilter = filterFromRegEx(noLettersTest);
    var noNumbersFilter = filterFromRegEx(noNumbersTest);
    var noCapsFilter = filterFromRegEx(noCapsTest);

    expect(
      noLettersTest.test(generateAlphaHash(32, noLettersFilter)),
    ).toBeTruthy();

    expect(
      noNumbersTest.test(generateAlphaHash(32, noNumbersFilter)),
    ).toBeTruthy();

    expect(noCapsTest.test(generateAlphaHash(32, noCapsFilter))).toBeTruthy();
  });
});
