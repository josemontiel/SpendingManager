/**
 * Created by Jose on 1/16/17.
 */

var db = require('./db');

var userSchema = db.Schema({
  email: String,
  hash: String,
  first_name: String,
  last_name: String,
  createdAt: Number,
  type: String
});

var User = db.model('User', userSchema);

module.exports = User;
