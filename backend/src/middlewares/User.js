const Joi = require('joi');

const loginValidator = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
})


const newUserValidator = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' }),
    name: Joi.string().required(),
})

module.exports = {
    loginValidator,
    newUserValidator,
}
