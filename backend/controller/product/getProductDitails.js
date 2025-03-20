const productModel = require("../../models/productModel")

const getProductDetailsController = async (req, res) => {
    try {
        const { productId } = req.body || req.query
        const product = await productModel.findById(productId)
        return res.status(200).json({
            message: "Product details get successfully",
            data: product,
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

module.exports = getProductDetailsController