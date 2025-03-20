const productModel = require("../../models/productModel")

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category 
        const products = await productModel.find({ category: { "$in" : categoryList } })
        return res.status(200).json({
            message: "Filter product get successfully",
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

module.exports = filterProductController