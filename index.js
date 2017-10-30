const { generateAlphaHash, generateHexHash } = require('./functions/hash');

const {
  generateSaltBuffer,
  generateSaltString,
  generatePasswordHashBuffer,
  generatePasswordHashString,
} = require('./functions/password');

const { generateBox, unlockBox, updateBox } = require('./functions/secretBox');

module.exports.generateAlphaHash = generateAlphaHash;
module.exports.generateHexHash = generateHexHash;
module.exports.generateSaltBuffer = generateSaltBuffer;
module.exports.generateSaltString = generateSaltString;
module.exports.generatePasswordHashBuffer = generatePasswordHashBuffer;
module.exports.generatePasswordHashString = generatePasswordHashString;

module.exports.generateBox = generateBox;
module.exports.unlockBox = unlockBox;
module.exports.updateBox = updateBox;
