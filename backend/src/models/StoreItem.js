const mongoose = require("mongoose")
const { generateRandomString } = require("../utils")

const storeItemSchema = new mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    storeId: { 
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    name: { 
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    price: { 
        type: mongoose.Schema.Types.Number, 
        required: true 
    },
}, {
    toObject: {
        transform: function(_doc, ret) {
            delete ret._id
            delete ret.__v
        }
    }
})

storeItemSchema.pre("validate", function(next){
    if(!this.itemId){
        this.createItemId()
    }
    next()
})

storeItemSchema.methods.createItemId = function(){
    this.itemId = 'ITM'+ generateRandomString(5) + Date.now()
}

const StoreItem = mongoose.model('StoreItem', storeItemSchema)
module.exports = StoreItem