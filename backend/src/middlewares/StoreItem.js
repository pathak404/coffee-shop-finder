const Joi = require('joi');

const newItemSchema = Joi.object({
    storeId: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required()
});

const updateItemSchema = Joi.object({
    storeId: Joi.string(),
    name: Joi.string(),
    price: Joi.number()
});

module.exports = {
    newItemSchema,
    updateItemSchema,
};

