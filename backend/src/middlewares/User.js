const Joi = require('joi');

const loginSchema = Joi.object({
    phone: Joi.number().required(),
    password: Joi.string().min(6).required(),
})


const newUserSchema = Joi.object({
    phone: Joi.number().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' }),
    name: Joi.string().required(),
})


module.exports = {
    loginSchema,
    newUserSchema,
}
