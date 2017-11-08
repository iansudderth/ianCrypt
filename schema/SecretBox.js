const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const secretBoxSchema = new mongoose.Schema({
  box: String,
});

module.exports = secretBoxSchema;
