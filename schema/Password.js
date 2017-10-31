const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const passwordSchema = new mongoose.Schema({
  salt: String,
  hash: String,
});
