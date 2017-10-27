var secretBoxUtilities = require('../functions/secretBox');

var { generateBox, unlockBox } = secretBoxUtilities;

describe('generateBox', () => {
  var testMessage = 'this is a test';
  var testPassword = 'also-a-test';

  it('should return a value', () => {
    expect(generateBox(testMessage, testPassword)).toBeTruthy();
  });

  it('should return a string', () => {});

  it('should return a different value each time it runs', () => {});

  it('should throw an error if either argument is not a string', () => {});
});

describe('unlockBox', () => {
  it('should return the original message if given the correct password and a box-string', () => {});

  it('should return null if the password was incorrect', () => {});

  it('should throw an error if the box is invalid', () => {});

  it('should throw an error if either argument is not a string', () => {});
});
