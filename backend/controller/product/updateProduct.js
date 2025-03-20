const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function updateProductController(req, res) {
    try {
        // get user id from req.userId midelware authToken
        const sessionUser = req.userId
        // check if user isn't admin
        if (!uploadProductPermission(sessionUser)) {
            throw new Error("You are not admin")
        }
        // apdate product and save in database
        const updateProduct = await productModel.findByIdAndUpdate(req.body._id, req.body)
        return res.status(201).json({
            message: "Product uploaded successfully",
            data: updateProduct,
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

module.exports = updateProductController