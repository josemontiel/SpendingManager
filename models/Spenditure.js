/**
 * Created by Jose on 1/16/17.
 */

var db = require('./db');

var spenditureSchema = db.Schema({
  user_id: String,
  description: String,
  amount: Number,
  when: Number,
  createdAt: Number
});

var Spenditure = db.model('Spenditure', spenditureSchema);

module.exports = Spenditure;
