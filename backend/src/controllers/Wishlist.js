const Store = require('../models/Store')
const Wishlist = require('../models/Wishlist')

const addToWishlist = async (req, res) => {
    try {
        const { storeId } = req.body
        let wishlist = await Wishlist.findOne({ userId: req.userId })
        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.userId, stores: [{ storeId }] })
        } else {
            wishlist.stores.push({ storeId })
        }
        await wishlist.save();
        res.sendResponse({ message: 'Item added to wishlist' })
    } catch (error) {
        res.sendResponse({ message: 'Failed to add item to wishlist' }, 500)
    }
}

const getWishlist = async (req, res) => {
    try {
        const { stores= []} = await Wishlist.findOne({ userId: req.userId })
        if (stores.length === 0) {
            return res.sendResponse({ message: 'Wishlist is empty', data: [] })
        }
        const wishlistData = await Store.find({storeId: {$in: stores.map(store => store.storeId)}}, { _id: 0, __v: 0})

        res.sendResponse({ message: 'Wishlist fetched successfully', data: wishlistData})
    } catch (error) {
        res.sendResponse({ message: 'Failed to get wishlist' }, 500)
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { storeId } = req.body
        let wishlist = await Wishlist.findOne({ userId: req.userId })
        if (!wishlist) {
            return res.sendResponse({ message: 'Wishlist not found' }, 404)
        }
        wishlist.stores = wishlist.stores.filter(store => store.storeId != storeId)
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