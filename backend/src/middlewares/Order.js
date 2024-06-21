const Joi = require('joi');

const newOrderValidator = Joi.object({
    storeId: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        itemId: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
    })).required(),
    amount: Joi.number().custom((value, helpers) => {
        const { items } = helpers.state.ancestors[0];
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        if (value.toFixed(2) !== totalPrice.toFixed(2)) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'Amount validation'),
})

const verifyPaymentValidator = Joi.object({
    razorpayPaymentId: Joi.string().required(),
    razorpayOrderId: Joi.string().required(),
});

module.exports = {
    newOrderValidator,
    verifyPaymentValidator,
};