const Store = require('../models/Store')

const createStore = async (req, res) => {
    try {
        const { name, phone, address, coordinates, rating } = req.body
        const store = new Store({ name, phone, address, coordinates, rating })
        await store.save()
        res.sendResponse({message: "Store created successfully", data: store.toObject()}, 201)
    } catch (error) {
        res.sendResponse({ message: 'Failed to create store'}, 500)
    }
}

const getStores = async (_req, res) => {
    try {
        const stores = await Store.find({}, { _id: 0, __v: 0 }).lean()
        res.sendResponse({message: "Stores fetched successfully", data: stores })
    } catch (error) {
        res.sendResponse({ message: 'Failed to get stores: '+ error.message }, 500)
    }
}


const getStoreById = async (req, res) => {
    try {
        const store = await Store.findOne({storeId: req.params.storeId})
        if (!store) {
            return res.sendResponse({ message: 'Store not found' }, 404)
        }
        res.sendResponse({ message: 'Store fetched successfully', data: {...store.toObject()} })
    } catch (error) {
        res.sendResponse({ message: 'Failed to get store' }, 500)
    }
}


const updateStore = async (req, res) => {
    try {
        const { name, phone, address, coordinates, rating } = req.body

        const store = await Store.findOneAndUpdate(
            { storeId: req.params.storeId },
            { name, phone, address, coordinates, rating },
            {
                new: true,
                lean: true,
                projection: { _id: 0, __v: 0 }
            }
        );

        if (!store) {
            return res.sendResponse({ message: 'Store not found' }, 404)
        }
        res.sendResponse({ message: 'Store updated successfully', data: {...store}})
    } catch (error) {
        res.sendResponse({ message: 'Failed to update store: ' + error.message }, 500)
    }
}


const deleteStore = async (req, res) => {
    try {
        const store = await Store.findOneAndDelete({storeId: req.params.storeId});
        if (!store) {
            return res.sendResponse({ message: 'Store not found' }, 404);
        }
        res.sendResponse({ message: 'Store deleted successfully' });
    } catch (error) {
        res.sendResponse({ message: 'Failed to delete store' }, 500);
    }
};

module.exports = {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore,
};