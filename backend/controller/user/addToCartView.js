const addToCartModel = require('../../models/cartProduct')

const addToCartViewController = async (req, res) => {
    try {
        // get user id from req.userId midelware authToken
        const userId = req.userId
        // get array of product
        const products = await addToCartModel.find({ userId: userId, pay: false }).populate('productId');
        return res.status(200).json({
            message: "All product in cart get successfully",
            data: products,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartViewController