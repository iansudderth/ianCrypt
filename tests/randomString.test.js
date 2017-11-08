var {
  randomHexString,
  randomAlphaString,
} = require('../functions/randomString');
var { filterFromRegEx } = require('../functions/utils');

describe('randomHexString', () => {
  it('should return a string', () => {
    expect(typeof randomHexString()).toBe('string');
  });

  it('should return a string of the given length', () => {
    expect(randomHexString(22).length).toBe(22);
  });

  it('should generate a string of length 16 if no value is passed', () => {
    expect(randomHexString().length).toBe(16);
  });

  it('should return a different value each time it is called', () => {
    expect(randomHexString()).not.toEqual(randomHexString());
  });

  it('should return a string that only includes hex characters', () => {
    var testValues = /^[a-f0-9]*$/g;
    expect(testValues.test(randomHexString())).toBeTruthy();
  });
});

describe('randomAlphaString', () => {
  it('should generate a string', () => {
    expect(typeof randomAlphaString()).toBe('string');
  });

  it('should return a string of the given length', () => {
    expect(randomAlphaString(46).length).toBe(46);
  });

  it('should return a different value each time it is called', () => {
    expect(randomAlphaString()).not.toEqual(randomAlphaString());
  });

  it('should return a string with alpha numeric characters', () => {
    var alphaTest = /^[a-zA-Z0-9]*$/g;
    expect(alphaTest.test(randomAlphaString())).toBeTruthy();
  });

  it('should ignore characters from the given filter', () => {
    var noLettersTest = /^[0-9]*$/g;
    var noNumbersTest = /^[a-zA-Z]*$/g;
    var noCapsTest = /^[a-z0-9]*$/g;

    var noLettersFilter = filterFromRegEx(noLettersTest);
    var noNumbersFilter = filterFromRegEx(noNumbersTest);
    var noCapsFilter = filterFromRegEx(noCapsTest);

    expect(noLettersTest.test(randomAlphaString(32, noLettersFilter))).toBe(
      true,
    );

    expect(noNumbersTest.test(randomAlphaString(32, noNumbersFilter))).toBe(
      true,
    );

    expect(noCapsTest.test(randomAlphaString(32, noCapsFilter))).toBe(true);
  });

  it('should accept a regular expression as an argument for the filter', () => {
    var noLettersTest = /^[0-9]*$/g;
    var noNumbersTest = /^[a-zA-Z]*$/g;
    var noCapsTest = /^[a-z0-9]*$/g;

    expect(noLettersTest.test(randomAlphaString(32, noLettersTest))).toBe(true);

    expect(noNumbersTest.test(randomAlphaString(32, noNumbersTest))).toBe(true);

    expect(noCapsTest.test(randomAlphaString(32, noCapsTest))).toBe(true);
  });
});
