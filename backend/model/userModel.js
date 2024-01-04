const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName : {
        type : String,
        required : [true, "Name must be provided"]
    },
    userEmail : {
        type : String,
        required : [true, 'Email must be provided'] // email aunu paro vanako true
        
    },

    userPassword :{
        type : String,
        required : [true, "Password must be provided"]
    },

    role :{
        type : String,
        enum :["patient", "admin"],
        default : "patient"
    },
    otp : {
        type : Number
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User
