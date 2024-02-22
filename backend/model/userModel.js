const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name must be provided"]
    },
    email : {
        type : String,
        required : [true, 'Email must be provided'] // email aunu paro vanako true
        
    },

    password:{
        type : String,
        required : [true, "Password must be provided"]
    },

    role :{
        type : String,
        enum :["patient", "admin"],
        default : "patient"
    },
    
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model("User",userSchema)
module.exports = User
