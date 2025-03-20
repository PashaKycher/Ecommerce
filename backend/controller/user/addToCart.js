const addToCartModel = require('../../models/cartProduct')

async function addToCartController(req, res) {
    try {
        // get user id from req.userId midelware authToken
        const sessionUser = req.userId
        // get product id from req.body
        const { productId } = req.body
        // check is product already in cart
        const checkProduct = await addToCartModel.findOne({ userId: sessionUser, productId: productId, pay: false })
        if (checkProduct) {
            return res.status(400).json({
                message: "Product already in cart",
                error: true,
                success: false
            })
        }
        // payload for add to cart
        const payload = {
            userId: sessionUser,
            productId: productId,
            quantity: 1,
            pay: false
        }
        // create cart object which will be save in database
        const addToCart = new addToCartModel(payload)
        // save cart in database
        const saveCart = await addToCart.save()
        return res.status(201).json({
            message: "Product added to cart successfully",
            data: saveCart,
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

module.exports = addToCartController