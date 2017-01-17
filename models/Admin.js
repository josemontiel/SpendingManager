/**
 * Created by Jose on 1/16/17.
 */

var db = require('db.js');

var adminSchema = db.Schema({
  email: String,
  hash: String,
  first_name: String,
  last_name: String,
  timestamp: Number,
  type: String
});

var Admin = db.model('Admin', adminSchema);

module.exports = Admin;
