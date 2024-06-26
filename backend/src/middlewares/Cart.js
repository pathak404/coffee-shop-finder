const Joi = require('joi');

const cartSchema = Joi.object({
    storeId: Joi.string().required(),
    itemId: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
})


module.exports = {
    cartSchema,
}