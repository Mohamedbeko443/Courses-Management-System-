const mongoose = require("mongoose");
const validator = require("validator");
const roles = require("../utils/roles");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        validate : [validator.isEmail , "Filed must be a valid email address"]
    },
    password: { type: String, required: true },
    token : {
        type : String 
    },
    role : {
        type: String ,
        enum : [roles.USER , roles.ADMIN , roles.MANAGER ],
        default : roles.USER
    },
    avatar : {
        type : String , 
        default : "uploads/elRay.jpg"
    }
})


module.exports = mongoose.model('User', userSchema);
