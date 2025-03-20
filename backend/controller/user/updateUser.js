const userModel = require('../../models/userModel')

async function updateUserController(req, res) {
    try {
        // get user id from req.userId midelware authToken
        const sessionUser = req.userId
        // get user id and info from req.body
        const { userId, role, email, firstName } = req.body
        // create payload for update
        const payload = {
            ...(email && { email: email }),
            ...(role && { role: role }),
            ...(firstName && { firstName: firstName })
        }
        // get data from db by sessionUser
        const user = await userModel.findById(sessionUser)
        // check if user isn't admin
        if (user.role !== "ADMIN") {
            throw new Error("You are not admin")
        }
        // find user by id and update
        const updateUser = await userModel.findByIdAndUpdate(userId, payload);
        return res.status(200).json({
            message: "User update successfully",
            data: updateUser,
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

module.exports = updateUserController