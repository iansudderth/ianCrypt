const { generateAlphaHash, generateHexHash } = require('./functions/hash');

const {
  generateSaltString,
  generatePasswordHashString,
} = require('./functions/password');

const { generateBox, unlockBox, updateBox } = require('./functions/secretBox');

module.exports.generateAlphaHash = generateAlphaHash;
module.exports.generateHexHash = generateHexHash;
module.exports.generateSalt = generateSaltString;
module.exports.generatePasswordHash = generatePasswordHashString;

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
