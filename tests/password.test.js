var passwordUtilities = require('../functions/password');

var {
  generatePasswordHashBuffer,
  generatePasswordHashString,
  generateSaltBuffer,
  generateSaltString,
  authenticatePassword,

} = passwordUtilities;

describe('generateSaltBuffer', () => {
  it('returns a value', () => {
    expect(generateSaltBuffer()).toBeTruthy();
  });

  it('returns a buffer', () => {
    expect(Buffer.isBuffer(generateSaltBuffer())).toBeTruthy();
  });

  it('has a length of 16', () => {
    expect(generateSaltBuffer().length).toBe(16);
  });

  it('has a different result each time it is called', () => {
    expect(generateSaltBuffer()).not.toEqual(generateSaltBuffer());
  });
});

describe('generateSaltString', () => {
  it('returns a value', () => {
    expect(generateSaltString()).toBeTruthy();
  });

  it('returns a string', () => {
    expect(typeof generateSaltString()).toBe('string');
  });

  it('has a length of 32', () => {
    expect(generateSaltString().length).toBe(32);
  });

  it('generates a different result each time it is called', () => {
    expect(generateSaltString()).not.toEqual(generateSaltString());
  });
});

describe('generatePasswordHashBuffer', () => {
  var sameSalt = generateSaltBuffer();
  var differentSalt = generateSaltBuffer();
  var password = 'password';
  var differentPassword = 'something-else';

  it('should return a value', () => {
    expect(generatePasswordHashBuffer(password, sameSalt)).toBeTruthy();
  });

  it('should return a buffer', () => {
    expect(
      Buffer.isBuffer(generatePasswordHashBuffer(password, sameSalt)),
    ).toBeTruthy();
  });

  it('should generate the same result given the same password and salt', () => {
    expect(generatePasswordHashBuffer(password, sameSalt)).toEqual(
      generatePasswordHashBuffer(password, sameSalt),
    );
  });

  it('should generate different results with the same password and different salts', () => {
    expect(generatePasswordHashBuffer(password, sameSalt)).not.toEqual(
      generatePasswordHashBuffer(password, differentSalt),
    );
  });

  it('should generate different results with different passwords and the same salt', () => {
    expect(generatePasswordHashBuffer(password, sameSalt)).not.toEqual(
      generatePasswordHashBuffer(differentPassword, sameSalt),
    );
  });

  it('should generate a hash of the given length', () => {
    expect(generatePasswordHashBuffer(password, sameSalt, 64).length).toBe(64);
  });

  it('should generate a hash of 32 bytes if no length value is given', () => {
    expect(generatePasswordHashBuffer(password, sameSalt).length).toBe(32);
  });

  it('should generate a different result if different speeds are specified', () => {
    expect(
      generatePasswordHashBuffer(password, sameSalt, undefined, 'fast'),
    ).not.toEqual(
      generatePasswordHashBuffer(password, sameSalt, undefined, 'med'),
    );
  });

  it('should take longer to run if a slower speed is specified', () => {
    var startTimeFast = new Date();
    generatePasswordHashBuffer(password, sameSalt);
    var endTimeFast = new Date();
    var fastTime = endTimeFast - startTimeFast;

    var startTimeSlow = new Date();
    generatePasswordHashBuffer(password, sameSalt, undefined, 'med');
    var endTimeSlow = new Date();
    var slowTime = endTimeSlow - startTimeSlow;

    expect(slowTime).toBeGreaterThan(fastTime);
  });
});

describe('generatePasswordHashString', () => {
  var sameSalt = generateSaltBuffer();
  var differentSalt = generateSaltBuffer();
  var password = 'password';
  var differentPassword = 'something-else';
  var saltHashFormat = /^[0-9a-f]{32}\/[0-9a-f]*$/;
  it('should return a value', () => {
    expect(generatePasswordHashString(password, sameSalt)).toBeTruthy();
  });

  it('should return a string', () => {
    expect(typeof generatePasswordHashString(password, sameSalt)).toBe(
      'string',
    );
  });

  it('should generate the same result given the same password and salt', () => {
    expect(generatePasswordHashString(password, sameSalt)).toEqual(
      generatePasswordHashString(password, sameSalt),
    );
  });

  it('should generate a different value with the same salt and different passwords', () => {
    expect(generatePasswordHashString(password, sameSalt)).not.toEqual(
      generatePasswordHashString(differentPassword, sameSalt),
    );
  });

  it('should generate a single string that includes the salt if no salt is passed', () => {
    console.log(generatePasswordHashString(password));
    expect(saltHashFormat.test(generatePasswordHashString(password))).toBe(
      true,
    );
  });
});

describe('authenticatePassword', () => {
  var sameSalt = generateSaltString();
  var differentSalt = generateSaltString();
  var password = 'password';
  var differentPassword = 'something-else';
  var passwordHash = generatePasswordHashString(password, sameSalt);
  var saltlessHash = generatePasswordHashString(password);
  var saltHashFormat = /^[0-9a-f]{32}\/[0-9a-f]*$/;

  it('should return a boolean', () => {
    expect(typeof authenticatePassword(password, passwordHash, sameSalt)).toBe(
      'boolean',
    );
  });

  it('should return false if the password or salt are incorrect', () => {
    expect(
      authenticatePassword(differentPassword, passwordHash, sameSalt),
    ).toBe(false);

    expect(authenticatePassword(password, passwordHash, differentSalt)).toBe(
      false,
    );
  });

  it('should return true if the password and salt are correct', () => {
    expect(authenticatePassword(password, passwordHash, sameSalt)).toBe(true);
  });

  it('should accept a combined password and salt string separated by a / if no salt is given', () => {
    expect(authenticatePassword(password, saltlessHash)).toBe(true);
  });

  it('throws an error if any part is invalid', () => {
    expect(() => {
      authenticatePassword(12345, saltlessHash);
    }).toThrow();
    expect(() => {
      authenticatePassword(password, passwordHash, 1231231231);
    }).toThrow();
    expect(() => {
      authenticatePassword(password, passwordHash);
    }).toThrow();
  });
});

describe('validatePassword', () => {
  var password = 'password';
  var incorrectPassword = 'not-really-though';

  var saltOne = generateSaltString();
  var saltTwo = generateSaltString();

  var hashOne = generatePasswordHashString(password, saltOne);
  var hashTwo = generatePasswordHashString(password, saltTwo);

  it('should return a boolean', () => {
    expect(typeof validatePassword(password, saltOne, hashOne)).toBe('boolean');
  });

  it('should return true if the password and salt pair matches the one used to generate the hash', () => {
    expect(validatePassword(password, saltOne, hashOne)).toBe(true);
    expect(validatePassword(password, saltTwo, hashTwo)).toBe(true);
  });

  it('should return false if the password is incorrect', () => {
    expect(validatePassword(incorrectPassword, hashOne, hashTwo)).toBe(false);
  });

  it('should return null if any of the arguments are missing', () => {
    expect(validatePassword()).toBe(null);
    expect(validatePassword(password)).toBe(null);
    expect(validatePassword(password, saltOne)).toBe(null);
  });
});
