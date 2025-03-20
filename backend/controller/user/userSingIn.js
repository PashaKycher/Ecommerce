const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
dotenv = require('dotenv').config();

async function userSingInController(req, res) {
    try {
        const { email, password } = req.body
        if (!email) {
            throw new Error("Please enter email")
        }
        if (!password) {
            throw new Error("Please enter password")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User don't exist")
        }
        // check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (checkPassword) {
            // token info
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            // create token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
            // token options
            const tokenOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            }
            // send token in cookie
            res.cookie('token', token, tokenOptions).status(200).json({
                message: "User sing in successfully",
                error: false,
                success: true,
                data: token
            })
        } else {
            throw new Error("Password not match") 
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSingInController