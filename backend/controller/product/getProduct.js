const productModel = require('../../models/productModel')

const getProductController = async (req, res) => {
    try {
        // get all products from database and sort by createdAt
        const allProduct = await productModel.find().sort({createdAt: -1})
        return res.status(200).json({
            message: "Product get successfully",            
            data: allProduct,
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

module.exports = getProductController