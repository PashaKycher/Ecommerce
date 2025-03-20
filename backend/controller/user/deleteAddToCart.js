const addToCartModel = require('../../models/cartProduct')

const deleteAddToCartController = async (req, res) => {
    try {
        // get user id from req.userId midelware authToken
        const userId = req.userId
        // get product id from req.body
        const { productId } = req.body
        // check is product in cart
        const checkProduct = await addToCartModel.findOne({ userId: userId, productId: productId, pay: false })
        if (!checkProduct) {
            return res.status(400).json({
                message: "Product not in cart",
                error: true,
                success: false
            })
        }
        // delete product from cart
        const deleteProduct = await addToCartModel.deleteOne({ userId: userId, productId: productId, pay: false })
        return res.status(200).json({
            message: "Product deleted from cart successfully",
            data: deleteProduct,
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

module.exports = deleteAddToCartController