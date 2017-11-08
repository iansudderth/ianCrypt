const {
  randomAlphaString,
  randomHexString,
} = require('./functions/randomString');

const {
  generateSaltString,
  generatePasswordHashString,
} = require('./functions/password');

const { generateBox, unlockBox, updateBox } = require('./functions/secretBox');

module.exports.randomAlphaString = randomAlphaString;
module.exports.randomHexString = randomHexString;

module.exports.generateSalt = generateSaltString;
module.exports.generatePasswordHash = generatePasswordHashString;

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
