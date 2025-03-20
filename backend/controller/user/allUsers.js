const userModel = require('../../models/userModel')

async function allUsersController(req, res) {
    try {
        // get all users
        const allUser = await userModel.find()
        // send all users to frontend
        return res.status(200).json({
            message: "All users get successfully",
            data: allUser,
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

module.exports = allUsersController