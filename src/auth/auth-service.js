const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');


const AuthService = {
  getUserWithEmail(db, email) {
    return db('users')
      .where({ email })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
  hashPassword(password){
    return bcrypt.hash(password, 12);
  },
};

module.exports = AuthService;