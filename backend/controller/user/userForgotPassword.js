async function userForgotPasswordController(req, res) {
    try {
        
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong in userForgotPasswordController",
            error: true,
            success: false
        })
    }
}

module.exports = userForgotPasswordController