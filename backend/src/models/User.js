const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { generateRandomString } = require('../utils')

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("validate", function(next){
    if(!this.userId){
        this.createUserId()
    }
    next()
})

userSchema.methods.createUserId = function(){
    this.userId = 'USR'+ generateRandomString(5) + Date.now()
}

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, 10)
}

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}


const User = mongoose.model('User', userSchema)
module.exports = User