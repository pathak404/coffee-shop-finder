const sendResponseMiddleware = (_req, res, next)=> {
    res.sendResponse = (data, statusCode = 200) => {
        res.status(statusCode).json({
            status: statusCode >= 200 && statusCode <= 299 ? true : false,
            ...data,
        })
    }
    next();
}

module.exports = {
    sendResponseMiddleware,
}