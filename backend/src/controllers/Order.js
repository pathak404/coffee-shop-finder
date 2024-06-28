const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Razorpay = require('razorpay')
const StoreItem = require("../models/StoreItem")
const Store = require("../models/Store")

const createOrder = async (req, res) => {
  try {
    const shippingCharge = 50;

    const cart = await Cart.findOne({ userId: req.userId })
    if (!cart || cart.items.length === 0) {
      return res.sendResponse({ message: 'Cart is empty' }, 400)
    }
    const storeId = cart.storeId
    const items = cart.items
    const itemIds = items.map(item => item.itemId)
    const storeItems = await StoreItem.find({ itemId: { $in: itemIds } }, { _id: 0, __v: 0 })
    const orderItems = storeItems.map(storeItem => {
      const cartItem = items.find(item => item.itemId === storeItem.itemId)
      return {
        itemId: storeItem.itemId,
        name: storeItem.name,
        quantity: cartItem.quantity,
        price: storeItem.price,
      }
    })
    const amount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingCharge

    const orderId = Order.createOrderId()
    const order = new Order({
      userId: req.userId,
      orderId,
      storeId,
      items: orderItems,
      amount,
    })
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    })
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: orderId,
    }
    const response = await instance.orders.create(options)
    order.razorpayOrderId = response.id
    await order.save()
    res.sendResponse({message: "Order created successfully", data: {...order.toObject()} })

  } catch (error) {
    res.sendResponse({message: error.message ?? error?.error?.description}, 500)
  }
}


const verifyPayment = async (req, res) => {
  try {
    const {razorpayPaymentId, razorpayOrderId} = req.body
    const order = await Order.findOne({razorpayOrderId})
    if(!order){
      return res.sendResponse({message: "Invalid order id"}, 400)
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    })
    const payment = await instance.payments.fetch(razorpayPaymentId)
    if(payment && payment.status === 'captured'){
      order.razorpayPaymentId = payment.id
      order.paymentStatus = payment.status
      await order.save()
      await Cart.deleteOne({ userId: req.userId })
      return res.sendResponse({message: "Payment verified successfully", data: {...order.toObject()} })
    }
    res.sendResponse({message: "Payment failed"}, 400)

  } catch (error) {
    res.sendResponse({message: error.message ?? "Invalid razorpayPaymentId"}, 500)
  }
}


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId: req.userId, paymentStatus: 'captured'}, { _id: 0, __v: 0 }).sort({createdAt: -1}).lean()
    if(!orders || orders.length === 0){
      return res.sendResponse({message: "No orders found", data: []})
    }
    const storeIds = orders.map(order => order.storeId)
    const stores = await Store.find({storeId: { $in: storeIds }}, { _id: 0, __v: 0 }).lean()
    orders.forEach(order => {
      const store = stores.find(store => store.storeId === order.storeId)
      order.storeName = store.name
    })
    res.sendResponse({data: orders, message: "Orders fetched successfully"})
  } catch (error) {
    res.sendResponse({message: error.message}, 500)
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({orderId: req.params.orderId})
    if(!order){
      return res.sendResponse({message: "Invalid orderId"}, 400)
    }
    res.sendResponse({data: {...order.toObject()}, message: "Order fetched successfully"})
  } catch (error) {
    res.sendResponse({message: error.message}, 500)
  }
}

module.exports = {
  createOrder,
  verifyPayment,
  getOrders,
  getOrderById,
}