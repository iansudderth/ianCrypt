var sodium = require('sodium-native');
var passwordUtils = require('./password');

var generateSaltBuffer = passwordUtils.generateSaltBuffer;
var generatePasswordHashBuffer = passwordUtils.generatePasswordHashBuffer;

function splitBox(boxHash) {
  var split = boxHash.split('/');
  return {
    salt: split[0],
    nonce: split[1],
    hash: split[2],
  };
}

function generateBox(message, password) {
  var nonce = new Buffer(sodium.crypto_secretbox_NONCEBYTES);
  sodium.randombytes_buf(nonce);

  var salt = generateSaltBuffer();
  var key = generatePasswordHashBuffer(password, salt);

  var messageBuffer = new Buffer(message);
  var encryptedMessage = new Buffer(
    messageBuffer.length + sodium.crypto_secretbox_MACBYTES,
  );

  sodium.crypto_secretbox_easy(encryptedMessage, messageBuffer, nonce, key);

  var encryptedText = encryptedMessage.toString('hex');
  var nonceText = nonce.toString('hex');
  var keyText = key.toString('hex');
  var saltText = salt.toString('hex');

  return saltText + '/' + nonceText + '/' + encryptedText;
}

function unlockBox(boxHash, password) {
  var box = splitBox(boxHash);

  var saltBuffer = new Buffer(box.salt, 'hex');
  var nonceBuffer = new Buffer(box.nonce, 'hex');
  var hashBuffer = new Buffer(box.hash, 'hex');
  var outputTextBuffer = new Buffer(
    hashBuffer.length - sodium.crypto_secretbox_MACBYTES,
  );

  var keyBuffer = generatePasswordHashBuffer(password, saltBuffer);

  var unlockWasSuccessful = sodium.crypto_secretbox_open_easy(
    outputTextBuffer,
    hashBuffer,
    nonceBuffer,
    keyBuffer,
  );

  if (unlockWasSuccessful) {
    return outputTextBuffer.toString();
  } else {
    return null;
  }
}

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
