const jwt = require('jsonwebtoken')

const generateJWT = function(userId){
    return {
        authToken: jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '2d'}),
        refreshToken: jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '5d'}),
    }
}

const verifyJWT = function(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateJWT,
    verifyJWT,
}