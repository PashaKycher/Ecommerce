const productModel = require("../../models/productModel")

const getCategoryWiseProductController = async (req, res) => {
    try {
        // get category from request
        const { category } = req?.body || req?.query
        // get all product from DB
        const products = await productModel.find({ category: category });
        // return response
        return res.status(200).json({
            message: "Category product get successfully",
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

module.exports = getCategoryWiseProductController