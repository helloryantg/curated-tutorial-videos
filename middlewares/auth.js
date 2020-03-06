const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const { SECRET } = process.env

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || req.query.token || req.body.token

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        next(err)
      } else {
        req.userId = decoded.id
        next()
      }
    })
  } else {
    res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .send({ msg: 'Permission denied' })
  }
}