const { generateAlphaHash, generateHexHash } = require('./functions/hash');

const {
  generateSaltString,
  generatePasswordHashString,
  validatePassword,
} = require('./functions/password');

const { generateBox, unlockBox, updateBox } = require('./functions/secretBox');

module.exports.generateAlphaHash = generateAlphaHash;
module.exports.generateHexHash = generateHexHash;
module.exports.generateSalt = generateSaltString;
module.exports.generatePasswordHash = generatePasswordHashString;
module.exports.validatePassword = validatePassword;

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
