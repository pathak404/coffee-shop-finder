const Cart = require('../models/Cart')
const StoreItem = require('../models/StoreItem')

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId })
        if (!cart || cart.items.length === 0) {
            return res.sendResponse({ message: 'Cart is empty', data: [] })
        }
        const items = cart.items
        const itemIds = items.map(item => item.itemId)
        const storeItems = await StoreItem.find({ itemId: { $in: itemIds } }, { _id: 0, __v: 0 })
        const cartData = storeItems.map(storeItem => {
            const cartItem = items.find(item => item.itemId === storeItem.itemId)
            if (cartItem) {
                return {
                    ...storeItem.toObject(),
                    quantity: cartItem.quantity
                }
            } else {
                return storeItem.toObject()
            }
        })
        res.sendResponse({ message: 'Cart fetched successfully', data: cartData })
    } catch (error) {
        res.sendResponse({ message: 'Failed to get cart: '+error.message }, 500)
    }
}


const updateCart = async (req, res) => {
    const { storeId, itemId, quantity } = req.body
    let message;
    try {
        let cart = await Cart.findOne({ userId: req.userId })
        if (!cart) {
            cart = new Cart({
                userId: req.userId,
                storeId: storeId,
                items: [{ itemId: itemId, quantity: quantity }]
            })
            message = 'Added to cart'
        } else {
            if (quantity === 0) {
                cart.items = cart.items.filter(item => item.itemId.toString() !== itemId)
                message = 'Removed from cart'
            } else {
                if (cart.storeId !== storeId) {
                    cart.storeId = storeId
                    cart.items = []
                }
                const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId)
                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity = quantity
                    message = 'Cart updated successfully'
                } else {
                    cart.items.push({ itemId: itemId, quantity: quantity })
                    message = 'Added to cart'
                }
            }
        }
        await cart.save()
        res.sendResponse({ message: message })
    } catch (error) {
        res.sendResponse({ message: 'Failed to update cart: ' + error.message }, 500)
    }
}

module.exports = {
    updateCart,
    getCart,
}