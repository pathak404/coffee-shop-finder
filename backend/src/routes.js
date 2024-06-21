const router = require('express').Router()

const { createUser, loginUser, reGenerateAuthToken } = require('./controllers/User')
const { createOrder, verifyPayment, getOrders, getOrder } = require('./controllers/Order')

const {newOrderValidator, verifyPaymentValidator} = require('./middlewares/Order')
const { loginValidator, newUserValidator } = require('./middlewares/User')
const { validate, jwtMiddleware } = require('./middlewares/helpers')


// user routes
router.post('/register', validate(newUserValidator), createUser)
router.post('/login', validate(loginValidator), loginUser)
router.post('/reauth', reGenerateAuthToken)

// protected routes
router.post('/order', validate(newOrderValidator), jwtMiddleware, createOrder)  
router.post('/verify-payment', validate(verifyPaymentValidator), jwtMiddleware, verifyPayment)
router.get('/order/all', jwtMiddleware, getOrders)
router.get('/order/:orderId', jwtMiddleware, getOrder)


module.exports = router