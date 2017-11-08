const {
  randomAlphaString,
  randomHexString,
} = require('./functions/randomString');

const {
  generateSaltString,
  generatePasswordHashString,
  validatePassword,
} = require('./functions/password');

const { generateBox, unlockBox, updateBox } = require('./functions/secretBox');

module.exports.randomAlphaString = randomAlphaString;
module.exports.randomHexString = randomHexString;

module.exports.generateSalt = generateSaltString;
module.exports.generatePasswordHash = generatePasswordHashString;
module.exports.validatePassword = validatePassword;

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
