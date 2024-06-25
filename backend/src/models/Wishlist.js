const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    stores: [{
        storeId: {
            type: mongoose.Schema.Types.String,
            required: true,
        }
    }]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)