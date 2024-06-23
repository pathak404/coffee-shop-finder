const Joi = require('joi');

const storeSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).required(),
    rating: Joi.number().required(),
});

module.exports = {
    storeSchema,
};
