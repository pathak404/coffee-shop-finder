const jwt = require('jsonwebtoken')

const generateJWT = (userId) => {
    return {
        authToken: jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '2d'}),
        refreshToken: jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '5d'}),
    }
}

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const generateRandomString = (len) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let res = ''
    for(let i=0; i<len; i++){
        const randomIndex = Math.floor(Math.random() * characters.length)
        res += characters.charAt(randomIndex)
    }
    return res
}



module.exports = {
    generateJWT,
    verifyJWT,
    generateRandomString,
}