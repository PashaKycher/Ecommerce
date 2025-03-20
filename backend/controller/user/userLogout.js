async function userLogoutController(req, res) {
    try {
        // token options
        const tokenOptions = {
            httpOnly: true,
            secure: true,
            smeSite: 'none',
        }
        // clear cookie which name 'token'
        res.clearCookie('token', tokenOptions).status(200).json({
            message: "User logout successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userLogoutController