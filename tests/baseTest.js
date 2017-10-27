var sodium = require('sodium-native');
var boxFunctions = require('../functions/secretBox');

var generateBox = boxFunctions.generateBox;
var unlockBox = boxFunctions.unlockBox;

var message = 'stuff and things';
var password = 'password';

var encryptTimeStart = new Date();
var box = generateBox(message, password);
var encryptTimeEnd = new Date();
console.log('box : ', box);

var decryptTimeStart = new Date();
var unlocked = unlockBox(box, password);
var decryptTimeEnd = new Date();
console.log(unlocked);

console.log('Time to encrypt : ', encryptTimeEnd - encryptTimeStart + 'ms');
console.log('Time to decrypt : ', decryptTimeEnd - decryptTimeStart + 'ms');

console.log(sodium.crypto_secretbox_KEYBYTES);
