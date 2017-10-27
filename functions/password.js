var sodium = require("sodium-native");

function generateSaltBuffer() {
  var saltBuffer = new Buffer(sodium.crypto_pwhash_SALTBYTES);
  sodium.randombytes_buf(saltBuffer);
  return saltBuffer;
}

function generateSaltString() {
  return generateSaltBuffer().toString("hex");
}

function generatePasswordHashBuffer(
  password,
  salt,
  size = sodium.crypto_secretbox_KEYBYTES,
  speed = "fast"
) {
  var opsLimit = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE;
  var memLimit = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE;

  speed = speed.toLowerCase();
  if (
    speed === "med" ||
    speed === "medium" ||
    speed === "mod" ||
    speed === "moderate"
  ) {
    opsLimit = sodium.crypto_pwhash_OPSLIMIT_MODERATE;
    memLimit = sodium.crypto_pwhash_MEMLIMIT_MODERATE;
  }

  if (
    speed === "slow" ||
    speed === "high" ||
    speed === "hi" ||
    speed === "sensitive"
  ) {
    opsLimit = sodium.crypto_pwhash_OPSLIMIT_SENSITIVE;
    memLimit = sodium.crypto_pwhash_MEMLIMIT_SENSITIVE;
  }
  var saltBuffer;
  if (Buffer.isBuffer(salt)) {
    saltBuffer = salt;
  } else {
    saltBuffer = new Buffer(salt, "hex");
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
    algorithm
  );

  return output;
}

function generatePasswordHashString(password, salt, size, speed) {
  return generatePasswordHashBuffer(password, salt, size, speed).toString(
    "hex"
  );
}

module.exports.generateSaltBuffer = generateSaltBuffer;
module.exports.generateSaltString = generateSaltString;
module.exports.generatePasswordHashBuffer = generatePasswordHashBuffer;
module.exports.generatePasswordHashString = generatePasswordHashString;
