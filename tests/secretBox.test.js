var secretBoxUtilities = require('../functions/secretBox');

var { generateBox, unlockBox, updateBox } = secretBoxUtilities;

var boxRegEx = /^[0-9a-f]{32}\/[0-9a-f]{48}\/[a-f0-9]{16,}$/;

describe('generateBox', () => {
  var testMessage = 'this is a test';
  var testPassword = 'also-a-test';

  it('should return a value', () => {
    expect(generateBox(testMessage, testPassword)).toBeTruthy();
  });

  it('should return a string', () => {
    expect(typeof generateBox(testMessage, testPassword)).toBe('string');
  });

  it('should return a different value each time it runs', () => {
    expect(generateBox(testMessage, testPassword)).not.toBe(
      generateBox(testMessage, testPassword),
    );
  });

  it('should throw an error if either argument is not a string', () => {
    expect(() => {
      generateBox(12345, 12345);
    }).toThrow();
  });
});

describe('unlockBox', () => {
  var testMessage = 'this is a test';
  var testPassword = 'also-a-test';
  var testBox = generateBox(testMessage, testPassword);

  it('should return the original message if given the correct password and a box-string', () => {
    expect(unlockBox(testBox, testPassword)).toBe(testMessage);
  });

  it('should return null if the password was incorrect', () => {
    expect(unlockBox(testBox, 'sdlkajwdlkajsd')).toBe(null);
  });

  it('should return null and log a warning if the box is invalid', () => {
    expect(
      unlockBox('123lklkd lsak ask dsd fls dflskd flsk df', testPassword),
    ).toBe(null);
  });

  it('should throw an error if either argument is not a string', () => {
    expect(() => {
      unlockBox(12345, 12345);
    }).toThrow();
  });
});

describe('updateBox', () => {
  var password = 'password';
  var message = '12345';
  var testBox = generateBox(message, password);

  it('should return a new secret box', () => {
    expect(boxRegEx.test(updateBox(testBox, password, text => text))).toBe(
      true,
    );
  });

  it('should return a new box that uses the same password', () => {
    var updatedBox = updateBox(testBox, password, text => text);
    expect(unlockBox(updatedBox, password)).toBeTruthy();
  });

  it('should take a callback that is called when the box is unlocked.  It should take the original message as an argument and return a new value to be encoded.', () => {
    var updatedBox = updateBox(testBox, password, text => text + '6789');
    expect(unlockBox(updatedBox, password)).toBe('123456789');
  });

  it('should return null if the password is incorrect and the updater function should never be called', () => {
    const updater = jest.fn(text => text);

    expect(updateBox(testBox, 'not the right pass', updater)).toBe(null);
    expect(updater).not.toBeCalled();
  });

  it('should return the original contents reencoded if no updater is passed in', () => {
    var updatedBox = updateBox(testBox, password);
    expect(unlockBox(updatedBox, password)).toBe(message);
  });

  it('should throw an error if any of the arguments are invalid', () => {
    expect(() => {
      updateBox(12345, 12123123, 123123);
    }).toThrow();
  });
});
