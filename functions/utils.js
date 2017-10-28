var sodium = require('sodium-native');

function randomizeBuffer(buff) {
  sodium.randombytes_buf(buff);
  return buff;
}

function generateRandomBuffer(length = 16) {
  var buff = new Buffer(length);
  randomizeBuffer(buff);
  return buff;
}

function filterFromRegEx(reg) {
  return function(char) {
    return reg.test(char);
  };
}

module.exports.randomizeBuffer = randomizeBuffer;
module.exports.generateRandomBuffer = generateRandomBuffer;
module.exports.filterFromRegEx = filterFromRegEx;
