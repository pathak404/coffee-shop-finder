const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false })

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    storeId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
})
cartSchema.index({ userId: 1 }, { unique: true });
module.exports = mongoose.model('Cart', cartSchema)