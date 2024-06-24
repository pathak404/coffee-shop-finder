const Joi = require('joi');

const cartSchema = Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number().min(1).optional(),
})


module.exports = {
    cartSchema,
}