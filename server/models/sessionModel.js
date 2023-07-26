const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set this to expire every 14 days
const EXPIRES = 14 * 24 * 60 * 60 * 1000;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: EXPIRES, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);