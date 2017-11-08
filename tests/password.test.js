var passwordUtilities = require('../functions/password');

var {
  generatePasswordHashBuffer,
  generatePasswordHashString,
  generateSaltBuffer,
  generateSaltString,
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
    expect(saltHashFormat.test(generatePasswordHashString(password))).toBe(
      true,
    );
  });
});
