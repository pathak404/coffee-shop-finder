const User = require("../models/User")
const { generateJWT, verifyJWT } = require("../utils")

const createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body

        const isExists = await User.findOne({ email })
        if (isExists) {
            return res.sendResponse({ message: "Sorry!, An account exists with this email address"}, 400)
        }

        const user = new User({ 
            name, 
            email,
        })
        user.setPassword(password)
        await user.save()
        const token = generateJWT(user.userId)
        res.sendResponse({ message: "Your account has been created successfully", data: {...user.toObject(), ...token} }, 201)

    } catch(error){
        res.sendResponse({ message: error.message }, 400)
    }
}



const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.sendResponse({ message: "Invalid email or password" }, 401)
        }
        if (!user.verifyPassword(password)) {
            return res.sendResponse({ message: "Invalid email or password" }, 401)
        }
        const token = generateJWT(user.userId)
        user.password = undefined
        res.sendResponse({ message: "Login successfull", data: { ...user.toObject(), ...token} })

    } catch(error){
        res.sendResponse({ message: error.message }, 400)
    }
}


const reGenerateAuthToken = (req, res) => {
    try{
        const { refreshToken } = req.body
        
        const data = verifyJWT(refreshToken)
        if (!data || !data.userId) {
            return res.sendResponse({ message: "Invalid refresh token" }, 401)
        }
        const token = generateJWT(data.userId)
        res.sendResponse({ message: "Token generated successfully", data: {...token}})

    } catch(error){
        res.sendResponse({ message: error.message }, 400)
    }
}



module.exports = {
    createUser,
    loginUser,
    reGenerateAuthToken,
}