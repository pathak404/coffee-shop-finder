const Order = require("../models/Order")
const Razorpay = require('razorpay')

const createOrder = async (req, res) => {
  try {
    const {storeId, items, amount} = req.body

    const orderId = Order.createOrderId()
    const order = new Order({
      userId: req.userId,
      orderId,
      storeId,
      items,
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
      return res.sendResponse({message: "Payment verified successfully", data: {...order.toObject()} })
    }
    res.sendResponse({message: "Payment failed"}, 400)

  } catch (error) {
    res.sendResponse({message: error.message ?? "Invalid razorpayPaymentId"}, 500)
  }
}


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId: req.userId}, { _id: 0, __v: 0 }).sort({createdAt: -1}).lean()
    res.sendResponse({data: {...orders}, message: "Orders fetched successfully"})
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