const Wishlist = require('../models/Wishlist')

const addToWishlist = async (req, res) => {
    try {
        const { itemId } = req.body
        let wishlist = await Wishlist.findOne({ userId: req.userId })
        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.userId, items: [{ itemId }] })
        } else {
            wishlist.items.push({ itemId })
        }
        await wishlist.save();
        res.sendResponse({ message: 'Item added to wishlist' })
    } catch (error) {
        res.sendResponse({ message: 'Failed to add item to wishlist' }, 500)
    }
}

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.userId }).populate('items.itemId')
        res.sendResponse({ wishlist })
    } catch (error) {
        res.sendResponse({ message: 'Failed to get wishlist' }, 500)
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.body
        let wishlist = await Wishlist.findOne({ userId: req.userId })
        if (!wishlist) {
            return res.sendResponse({ message: 'Wishlist not found' }, 404)
        }
        wishlist.items = wishlist.items.filter(item => item.itemId != itemId)
        await wishlist.save();
        res.sendResponse({ message: 'Item removed from wishlist' })
    } catch (error) {
        res.sendResponse({ message: 'Failed to remove item from wishlist' }, 500)
    }
}

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
}