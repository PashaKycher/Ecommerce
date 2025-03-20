const addToCartModel = require('../../models/cartProduct')

const countAddToCartProductController = async (req, res) => {
    try {
        // get user id from req.userId midelware authToken
        const userId = req.userId
        // get count
        const count = await addToCartModel.countDocuments({ userId: userId, pay: false })
        return res.status(200).json({
            message: "Product count get successfully",
            data: count,
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

module.exports = countAddToCartProductController