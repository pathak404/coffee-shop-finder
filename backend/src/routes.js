const router = require('express').Router()
const { createUser, loginUser, reGenerateAuthToken } = require('./controllers/User')
const { loginValidator, newUserValidator } = require('./middlewares/User')
const { validate, jwtMiddleware } = require('./middlewares/helpers')

router.post('/register', validate(newUserValidator), createUser)
router.post('/login', validate(loginValidator), loginUser)
router.post('/reauth', reGenerateAuthToken)

module.exports = router