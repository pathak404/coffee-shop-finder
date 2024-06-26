const Joi = require('joi');

const newItemSchema = Joi.object({
    storeId: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    desc: Joi.string().required(),
});

const updateItemSchema = Joi.object({
    storeId: Joi.string(),
    name: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    desc: Joi.string(),
});

module.exports = {
    newItemSchema,
    updateItemSchema,
};

