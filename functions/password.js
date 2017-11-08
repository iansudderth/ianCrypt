var sodium = require('sodium-native');

function generateSaltBuffer() {
  var saltBuffer = new Buffer(sodium.crypto_pwhash_SALTBYTES);
  sodium.randombytes_buf(saltBuffer);
  return saltBuffer;
}

function generateSaltString() {
  return generateSaltBuffer().toString('hex');
}

function generatePasswordHashBuffer(
  password,
  salt,
  size = sodium.crypto_secretbox_KEYBYTES,
  speed = 'fast',
) {
  var opsLimit = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE;
  var memLimit = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE;

  speed = speed.toLowerCase();
  if (
    speed === 'med' ||
    speed === 'medium' ||
    speed === 'mod' ||
    speed === 'moderate'
  ) {
    opsLimit = sodium.crypto_pwhash_OPSLIMIT_MODERATE;
    memLimit = sodium.crypto_pwhash_MEMLIMIT_MODERATE;
  }

  if (
    speed === 'slow' ||
    speed === 'high' ||
    speed === 'hi' ||
    speed === 'sensitive'
  ) {
    opsLimit = sodium.crypto_pwhash_OPSLIMIT_SENSITIVE;
    memLimit = sodium.crypto_pwhash_MEMLIMIT_SENSITIVE;
  }
  var saltBuffer;
  if (Buffer.isBuffer(salt)) {
    saltBuffer = salt;
  } else {
    saltBuffer = new Buffer(salt, 'hex');
  }
  var output = new Buffer(size);
  var passBuffer = new Buffer(password);
  var algorithm = sodium.crypto_pwhash_ALG_DEFAULT;
  sodium.crypto_pwhash(
    output,
    passBuffer,
    saltBuffer,
    opsLimit,
    memLimit,
    algorithm,
  );

  return output;
}

function generatePasswordHashString(
  password,
  salt,
  size = sodium.crypto_secretbox_KEYBYTES,
  speed = 'fast',
) {
  if (!salt) {
    salt = generateSaltBuffer();
    saltString = salt.toString('hex');
    var passwordHashString = generatePasswordHashString(
      password,
      salt,
      size,
      speed,
    );
    return saltString + '/' + passwordHashString;
  } else {
    return generatePasswordHashBuffer(password, salt, size, speed).toString(
      'hex',
    );
  }
}

function authenticatePassword(password, passwordHash, salt) {
  var saltHashFormat = /^[0-9a-f]{32}\/[0-9a-f]*$/;

  if (typeof password !== 'string') {
    throw 'password must be a string';
  }
  if (typeof passwordHash !== 'string') {
    ('password hash must be a string');
  }
  if (!salt) {
    if (saltHashFormat.test(passwordHash)) {
      var splitHash = passwordHash.split('/');
      passwordHash = splitHash[1];
      salt = splitHash[0];
    } else {
      throw 'If no salt is passed, password hash must include a salt as created by generatePasswordHashString when no salt is passed.';
    }
  }

  if (typeof salt !== 'string') {
    throw 'salt must be a string';
  }

  var testHash = generatePasswordHashString(password, salt);

  return testHash === passwordHash;
}

function validatePassword(password, salt, hash, speed = 'fast') {
  if (!password || !salt || !hash) {
    return null;
  }

  var passHash = generatePasswordHashString(
    password,
    salt,
    (size = hash.length / 2),
    speed,
  );

  return passHash === hash;
}

module.exports.generateSaltBuffer = generateSaltBuffer;
module.exports.generateSaltString = generateSaltString;
module.exports.generatePasswordHashBuffer = generatePasswordHashBuffer;
module.exports.generatePasswordHashString = generatePasswordHashString;
module.exports.authenticatePassword = authenticatePassword;

