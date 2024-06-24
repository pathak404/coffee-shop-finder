const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StoreItem',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);