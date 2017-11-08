const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const singleUseToken = new mongoose.Schema({
  token: String,
  used: Boolean,
});

module.exports = singleUseToken;
