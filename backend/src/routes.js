const router = require('express').Router()
const { validate, jwtMiddleware } = require('./middlewares/helpers')

const { createUser, loginUser, reGenerateAuthToken } = require('./controllers/User')
const { loginSchema, newUserSchema } = require('./middlewares/User')

const { createOrder, verifyPayment, getOrders, getOrderById } = require('./controllers/Order')
const {newOrderSchema, verifyPaymentSchema} = require('./middlewares/Order')

const { getStores, getStoreById, createStore, updateStore, deleteStore } = require('./controllers/Store')
const { storeSchema } = require('./middlewares/Store')

const { newItemSchema, updateItemSchema } = require('./middlewares/StoreItem')
const { getAllStoreItems, getStoreItemById, createStoreItem, updateStoreItem, deleteStoreItem } = require('./controllers/StoreItem')


// user routes
router.post('/register', validate(newUserSchema), createUser)
router.post('/login', validate(loginSchema), loginUser)
router.post('/reauth', reGenerateAuthToken)



// protected routes ------------------------------------------------

// order routes
router.post('/order', validate(newOrderSchema), jwtMiddleware, createOrder)  
router.post('/verify-payment', validate(verifyPaymentSchema), jwtMiddleware, verifyPayment)
router.get('/order/all', jwtMiddleware, getOrders)
router.get('/order/:orderId', jwtMiddleware, getOrderById)

// store routes
router.get("/store/all", jwtMiddleware, getStores)
router.get("/store/:storeId", jwtMiddleware, getStoreById)
// use them only if you are an admin
router.post("/store", validate(storeSchema), jwtMiddleware, createStore)
router.put("/store/:storeId", validate(storeSchema), jwtMiddleware, updateStore)
router.delete("/store/:storeId", jwtMiddleware, deleteStore)

// item routes
router.get("/item/all", jwtMiddleware, getAllStoreItems)
router.get("/item/:itemId", jwtMiddleware, getStoreItemById)
router.post("/item", validate(newItemSchema), jwtMiddleware, createStoreItem)
router.put("/item/:itemId", validate(updateItemSchema), jwtMiddleware, updateStoreItem)
router.delete("/item/:itemId", jwtMiddleware, deleteStoreItem)

module.exports = router