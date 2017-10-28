var sodium = require('sodium-native');
var _ = require('lodash');
var { randomizeBuffer, generateRandomBuffer } = require('./utils');

function generateHexHash(length = 16) {
  var bufferLength = Math.floor(length / 2);
  var buff = generateRandomBuffer(length);
}

function generateAlphaHash(length = 16, filter) {
  if (!filter) {
    filter = () => true;
  }
}

module.exports.generateAlphaHash = generateAlphaHash;
module.exports.generateHexHash = generateHexHash;
