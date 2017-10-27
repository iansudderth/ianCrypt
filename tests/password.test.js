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
  it('should return a value', () => {});

  it('should return a buffer', () => {});

  it('should generate the same result given the same password and salt', () => {});

  it('should generate different results with the same password and different salts', () => {});

  it('should generate different results with different passwords and the same salt', () => {});

  it('should generate a hash of the given length', () => {});

  it('should generate a hash of 32 bytes if no length value is given', () => {});

  it('should generate a different result if different speeds are specified', () => {});

  it('should take longer to run if a slower speed is specified', () => {});
});

describe('generatePasswordHashString', () => {
  it('should return a value', () => {});

  it('should return a string', () => {});

  it('should generate the same result given the same password and salt', () => {});
});
