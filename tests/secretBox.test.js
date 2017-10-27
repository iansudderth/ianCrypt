var secretBoxUtilities = require('../functions/secretBox');

var { generateBox, unlockBox } = secretBoxUtilities;

describe('generateBox', () => {
  var testMessage = 'this is a test';
  var testPassword = 'also-a-test';

  it('should return a value', () => {
    expect(generateBox(testMessage, testPassword)).toBeTruthy();
  });
});

describe('unlockBox', () => {});

describe('round trip', () => {});
