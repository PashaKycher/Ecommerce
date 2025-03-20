const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    firstName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String
}, {timestamps: true});

const userModel = mongoose.model('user', userShema);
module.exports = userModel