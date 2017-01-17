/**
 * Created by Jose on 1/16/17.
 */
require('dotenv').config();

var mongoose   = require('mongoose');
var db_user = process.env.DB_USER;
var db_password = process.env.DB_PASSWORD;

mongoose.connect('mongodb://'+db_user+':'+db_password+'@ds011903.mlab.com:11903/spending_manager');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = mongoose;
