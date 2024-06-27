const Joi = require('joi')

const verifyPaymentSchema = Joi.object({
    razorpayPaymentId: Joi.string().required(),
    razorpayOrderId: Joi.string().required(),
})

module.exports = {
    verifyPaymentSchema,
}