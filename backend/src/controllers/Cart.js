const Cart = require('../models/Cart')

const addToCart = async (req, res) => {
    const { itemId, quantity } = req.body
    try {
        let cart = await Cart.findOne({ userId: req.userId })
        if (!cart) {
            cart = new Cart({userId: req.userId, items: [{ itemId, quantity }] })
        } else {
            const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId)
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({ productId, quantity })
            }
        }
        await cart.save()
        res.sendResponse({ message: 'Item added to cart' })
    } catch (error) {
        res.sendResponse({ message: 'Failed to add item to cart' }, 500)
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.itemId')
        res.sendResponse({ cart })
    } catch (error) {
        res.sendResponse({ message: 'Failed to get cart' }, 500)
    }
}

const removeFromCart = async (req, res) => {
    const { itemId } = req.body
    try {
        const cart = await Cart.findOne({ userId: req.userId})
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        cart.items = cart.items.filter(item => item.itemId.toString() !== itemId)
        await cart.save()
        res.sendResponse({ message: 'Item removed from cart' })
    } catch (error) {
        res.sendResponse({ message: 'Failed to remove item from cart' }, 500)
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
}