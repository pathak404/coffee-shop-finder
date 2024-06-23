const StoreItem = require('../models/StoreItem')

const createStoreItem = async (req, res) => {
    try {
        const { storeId, name, price } = req.body
        const storeItem = await StoreItem.create({ storeId, name, price })
        res.sendResponse({ message: 'Store item created successfully', data: {...storeItem.toObject()} }, 201)
    } catch (error) {
        res.sendResponse({ message: error.message }, 500)
    }
}


const getAllStoreItems = async (_req, res) => {
    try {
        const storeItems = await StoreItem.find({}, { _id: 0, __v: 0 }).lean()
        res.sendResponse({ data: {...storeItems}, message: 'Store items fetched successfully' }, 200)
    } catch (error) {
        res.sendResponse({ message: error.message }, 500)
    }
}


const getStoreItemById = async (req, res) => {
    try {
        const storeItem = await StoreItem.findOne({itemId: req.params.itemId})
        res.sendResponse({ data: {...storeItem.toObject()}, message: 'Store item fetched successfully' }, 200)
    } catch (error) {
        res.sendResponse({ message: error.message }, 500)
    }
}


const updateStoreItem = async (req, res) => {
    try {
        const { storeId, name, price } = req.body
        const storeItem = await StoreItem.findOneAndUpdate(
            {itemId: req.params.itemId}, 
            {storeId, name, price}, 
            {
                new: true,
                lean: true,
                projection: { _id: 0, __v: 0 }
            }
        )
        res.sendResponse({ data: {...storeItem}, message: 'Store item updated successfully' }, 200)
    } catch (error) {
        res.sendResponse({ message: error.message }, 500)
    }
}


const deleteStoreItem = async (req, res) => {
    try {
        await StoreItem.findByIdAndDelete(req.params.itemId)
        res.sendResponse({ message: 'Store item deleted successfully' })
    } catch (error) {
        res.sendResponse({ message: error.message }, 500)
    }
}


module.exports = {
    getAllStoreItems,
    getStoreItemById,
    createStoreItem,
    updateStoreItem,
    deleteStoreItem,
}