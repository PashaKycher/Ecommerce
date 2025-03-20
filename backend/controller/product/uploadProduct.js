const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function uploadProductController(req, res) {
    try {
        // get user id from req.userId midelware authToken
        const sessionUser = req.userId
        // check if user isn't admin
        if (!uploadProductPermission(sessionUser)) {
            throw new Error("You are not admin")
        }
        // create product object which will be save in database
        const uploadProduct = new productModel(req.body)
        // save product in database
        const saveProduct = await uploadProduct.save()
        return res.status(201).json({
            message: "Product uploaded successfully",
            data: saveProduct,
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

module.exports = uploadProductController