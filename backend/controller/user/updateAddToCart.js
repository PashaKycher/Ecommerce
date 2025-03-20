const addToCartModel = require('../../models/cartProduct')

const updateAddToCartController = async (req, res) => {
    try {
        // get user id from req.userId midelware authToken
        const sessionUser = req.userId
        // get object id from req.body
        const objectId  = req?.body?._id
        // get quantity from req.body
        const qty = req.body.quantity
        // update cart in database
        const updateCart = await addToCartModel.updateOne({ _id: objectId }, {...(qty && { quantity: qty })})
        return res.status(200).json({
            message: "Cart updated successfully",
            data: updateCart,
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

module.exports = updateAddToCartController