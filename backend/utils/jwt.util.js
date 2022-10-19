const { promisify } = require('util')
const jwtUtil = require('jsonwebtoken')
const redisClient = require('./redis.util')
require('dotenv').config()

const secret = process.env.JWT_KEY

module.exports = {
  sign: (email) => {
    const payload = {
      email: email
    }
    console.log('jwt.util.js sign secret: ', secret);
    return jwtUtil.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
    })
  },
  verify: (token) => {
    console.log('jwt.util.js verify token: ', token);
    let decoded = null;
    try {
      decoded = jwtUtil.verify(token, secret)
      return {
        type: true,
        email: decoded.email
      }
    } catch (err) {
      return {
        type: false,
        message: err.message
      }
    }
  },
  refresh: () => {
    return jwtUtil.sign({}, secret, {
      algorithm: 'HS256',
      expiresIn: '14d'
    })
  },
  refreshVerify: async (token, email) => {
    const getAsync = promisify(redisClient.get).bind(redisClient)
    try {
      const data = await getAsync(email)
      if (token === data) {
        try {
          jwtUtil.verify(token, secret)
          return true
        } catch (err) {
          return false
        }
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }
}