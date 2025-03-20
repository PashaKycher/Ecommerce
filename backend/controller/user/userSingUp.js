const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function userSingUpController(req, res) {
    try {
        const { firstName, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            throw new Error("User already exist")
        }
        if (!email) {
            throw new Error("Please enter email")
        }
        if (!firstName) {
            throw new Error("Please enter firstName")
        }
        if (!password) {
            throw new Error("Please enter password")
        }
        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if (!hashPassword) {
            throw new Error("Somesing is wrong whis hash passwoord")
        }
        // create dataUser
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        // respons if user create
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Succesfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSingUpController