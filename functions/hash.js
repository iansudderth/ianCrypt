var sodium = require('sodium-native');
var _ = require('lodash');
var {
  randomizeBuffer,
  generateRandomBuffer,
  filterFromRegEx,
} = require('./utils');

function generateHexHash(length = 16) {
  var bufferLength = Math.floor(length / 2);
  var buff = generateRandomBuffer(bufferLength);
  return buff.toString('hex');
}

function generateAlphaHash(length = 16, filter = () => true) {
  if (filter instanceof RegExp) {
    filter = filterFromRegEx(filter);
  }
  // prettier-ignore
  var charArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']

  var validCharacters = charArr.filter(filter);

  var hash = '';

  for (let i = 0; i < length; i++) {
    let random = _.random(0, validCharacters.length - 1);
    hash += validCharacters[random];
  }

  return hash;
}

module.exports.generateAlphaHash = generateAlphaHash;
module.exports.generateHexHash = generateHexHash;
