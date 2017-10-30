var sodium = require('sodium-native');
var passwordUtils = require('./password');

var generateSaltBuffer = passwordUtils.generateSaltBuffer;
var generatePasswordHashBuffer = passwordUtils.generatePasswordHashBuffer;

var boxRegEx = /^[0-9a-f]{32}\/[0-9a-f]{48}\/[a-f0-9]{16,}$/;

function splitBox(boxHash) {
  var split = boxHash.split('/');
  return {
    salt: split[0],
    nonce: split[1],
    hash: split[2],
  };
}

function generateBox(message, password) {
  if (typeof message !== 'string') {
    throw 'boxHash must be a string';
  }

  if (typeof password !== 'string') {
    throw 'Password must be a string';
  }
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
  var saltText = salt.toString('hex');

  return saltText + '/' + nonceText + '/' + encryptedText;
}

function unlockBox(boxHash, password) {
  if (typeof boxHash !== 'string') {
    throw 'boxHash must be a string';
  }

  if (typeof password !== 'string') {
    throw 'Password must be a string';
  }

  if (!boxRegEx.test(boxHash)) {
    console.warn('Invalid Boxhash Received');
    return null;
  }

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

function updateBox(boxHash, password, updater = text => text) {
  if (typeof boxHash !== 'string') {
    throw 'boxHash must be a string';
  }

  if (typeof password !== 'string') {
    throw 'Password must be a string';
  }

  if (typeof updater !== 'function') {
    throw 'Updater must be a function or undefined';
  }

  var unlockedBox = unlockBox(boxHash, password);
  if (unlockedBox === null) {
    return null;
  }
  var newContents = updater(unlockedBox);
  return generateBox(newContents, password);
}

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
