const productModel = require("../../models/productModel")

const getCategoryProductOneController = async (req, res) => {
    try {
        // get all category from DB
        const productCategory = await productModel.distinct("category")
        // create array of category
        const productByCategory = []
        // get first product from each category
        for(const category of productCategory) {
            const firstProduct = await productModel.findOne({category: category})
            // check if product exist
            if(firstProduct) {
                // push product in array
                productByCategory.push(firstProduct)
            }
        }
        return res.status(200).json({
            message: "Category product get successfully",
            data: productByCategory,
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

module.exports = getCategoryProductOneController