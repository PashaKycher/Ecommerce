const productModel = require("../../models/productModel")

const searchProductController = async (req, res) => {
    try {
        // get product category from request
        const search = req.query.q
        // get all product from DB
        const products = await productModel.find({
            $or: [
                { category: { $regex: search, $options: "i" } },
                { productName: { $regex: search, $options: "i" } }
            ]
        });
        // return response
        return res.status(200).json({
            message: "Search product get successfully",
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

module.exports = searchProductController