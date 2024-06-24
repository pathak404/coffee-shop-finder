const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StoreItem',
            required: true,
        }
    }]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)