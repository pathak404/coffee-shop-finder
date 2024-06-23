const mongoose = require("mongoose")
const { generateRandomString } = require("../utils")

const storeSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    phone: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    coordinates: {
        type: mongoose.Schema.Types.Array,
        required: true,
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
}, {
    toObject: {
        transform: function(_doc, ret) {
            delete ret._id
            delete ret.__v
        }
    }
})

storeSchema.pre("validate", function(next){
    if(!this.storeId){
        this.createStoreId()
    }
    next()
})

storeSchema.methods.createStoreId = function(){
    this.storeId = 'STR'+ generateRandomString(5) + Date.now()
}

const Store = mongoose.model('Store', storeSchema)
module.exports = Store