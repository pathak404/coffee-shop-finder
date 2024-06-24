const Joi = require('joi');

const storeSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).required(),
    rating: Joi.number().required(),
    category: Joi.string().required(),
    reviews: Joi.number().required(),
    startingPrice: Joi.number().required(),
});

module.exports = {
    storeSchema,
};
