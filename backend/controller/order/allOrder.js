const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')

const allOrderController = async (req, res) => {
    try {
        // check if user is admin
        const userId = req.userId
        const user = await userModel.findById(userId)
        if (user.role !== "ADMIN") {
            return res.status(500).json({
                message: "You are not admin",
                error: true,
                success: false
            })
        }
        // get all order
        const allOrder = await orderModel.find().sort({ createdAt: -1 })
        // send all order to frontend
        return res.status(200).json({
            message: "All order get successfully",
            data: allOrder,
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

module.exports = allOrderController