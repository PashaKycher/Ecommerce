const orderModel = require("../../models/orderProductModel");

const orderController = async (req, res) => {
    try {
        // get user id from req.userId midelware authToken
        const currentUser = req.userId;
        // get orders
        const orders = await orderModel.find({ userId: currentUser }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Order get successfully",
            data: orders,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = orderController