const Joi = require('joi')

const wishlistSchema = Joi.object({
    itemId: Joi.string().required(),
});

module.exports = {
    wishlistSchema,
}