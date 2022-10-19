const { sign, verify, refreshVerify } = require('../utils/jwt.util')
const jwt = require('jsonwebtoken')

const refresh = async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization.split('Bearer ')[1]
    const refreshToken = req.headers.refresh

    const authResult = verify(authToken)
    const decoded = jwt.decode(authToken)

    if (decoded === null) {
      return res.status(401).send({
        type: false,
        message: '권한이 없습니다.'
      })
    }

    const refreshResult = refreshVerify(refreshToken, decoded.email)
    if (authResult.ok === false && authResult.message === 'jwt expired') {
      if (refreshResult.ok === false) {
        res.status(401).send({
          type: false,
          message: '새로 로그인해야 합니다.'
        })
      } else {
        const newAccessToken = sign(decoded.email)
        return res.status(200).send({
          type: true,
          data: {
            accessToken: newAccessToken,
            refreshToken
          }
        })
      }
    } else {
      return res.status(400).send({
        type: false,
        message: 'Access Token이 만료되지 않았습니다.'
      })
    }
  } else {
    return res.status(400).send({
      type: false,
      message: '재발급 받기 위해 Access Token과 Refresh Token이 필요합니다.'
    })
  }
}

module.exports = refresh