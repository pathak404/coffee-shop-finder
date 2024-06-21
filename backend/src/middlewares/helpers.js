const jwt = require('jsonwebtoken')

const sendResponseMiddleware = (_req, res, next)=> {
    res.sendResponse = (data, statusCode = 200) => {
        res.status(statusCode).json({
            status: statusCode >= 200 && statusCode <= 299 ? true : false,
            ...data,
        })
    }
    next()
}

const jwtMiddleware = (req, _res, next) => {
    if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1]
        let data = jwt.verify(token, process.env.JWT_SECRET)
        if(data){
            req.userId = data.userId
            next()
        }
    }
    return res.sendResponse({message: 'Unauthorized'}, 401)
}

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if(error){
            return res.sendResponse({message: error.details[0].message}, 400)
        }
        next()
    }
}

module.exports = {
    sendResponseMiddleware,
    jwtMiddleware,
    validate,
}