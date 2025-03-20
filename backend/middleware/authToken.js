const jwt = require("jsonwebtoken");
dotenv = require('dotenv').config();

async function authToken(req, res, next) {
    try {
        // get token
        const token = req.cookies?.token
        // check token 
        if (!token) {
           return res.status(200).json({
               message: "Please login first",
               error: true,
               success: false
           }) 
        }
        // get data user and give user id to req to next step
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log('error auth',err);
            }
            // give user id to req to next step
            req.userId = decoded._id
            next()
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken