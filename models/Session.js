/**
 * Created by Jose on 1/16/17.
 */

var db = require('./db');

var sessionSchema = db.Schema({
    email: String,
    session_id: String,
    timestamp: Number
});

var User = db.model('User', userSchema);

module.exports = User;
