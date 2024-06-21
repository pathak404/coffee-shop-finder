const mongoose = require("mongoose")
const { generateRandomString } = require("../utils")

const itemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    quantity: { type: mongoose.Schema.Types.Number, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true }
})


const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    amount: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    storeId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    items: {
        type: [itemSchema],
        required: true,
    },
    razorpayOrderId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    razorpayPaymentId: {
        type: mongoose.Schema.Types.String,
        default: null,
    },
    paymentStatus: {
        type: mongoose.Schema.Types.String,
        default: "pending",
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
})

orderSchema.pre("validate", function(next){
    if(!this.orderId){
        this.orderId = this.createOrderId()
    }
    next()
})

orderSchema.statics.createOrderId = function(){
    return 'ODR'+ generateRandomString(5) + Date.now()
}

const Order = mongoose.model('Order', orderSchema)
module.exports = Order