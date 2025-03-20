const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try {
        // get user id from req midelware authToken and get user by id from db
        const user = await userModel.findById(req.userId)
        // send user details to frontend
        return res.status(200).json({
            message: "User details get successfully",
            data: user,
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

module.exports = userDetailsController