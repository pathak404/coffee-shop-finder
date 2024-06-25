const Joi = require('joi')

const wishlistSchema = Joi.object({
    storeId: Joi.string().required(),
})

module.exports = {
    wishlistSchema,
}