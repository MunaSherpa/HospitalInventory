const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")

// register
exports.registerUser = async(req,res)=>{
    const {name, email, password} = req.body
    if (!name || !email ||!password){
       return res.status(400).json({
            message:"Please provide name, email and password"
        })
    }

    //check if that email user already exist or not
   const userFound = await User.find({userEmail : email})
   if (userFound.length > 0 ){  // if the >0 user is already registered
        return res.status(400).json({
            message : "User with that email already Registered."
        })
   }
    //else
await User.create({
    userName : name,
    userEmail : email,
    userPassword : bcrypt.hashSync(password,10)//10 no is salt and how many number keep told this 10 no
})
res.status(201).json({
    message:"User registered sucessfully."
})
}


// login

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({ // retrun do the work of else , else na garnu paros vanara return garako
            message: "Please provide Email, Password."
        })
    }

    // check if that email user exists or not
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0){ // is the ==0 then is not found
        return res.status(404).json({ // 404 is not found
            message : "User with that Email is Not Registered."
        })
    }
    // password check
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched){
        // generate token
        // token is unique identifier which check the which person is login
       const token = jwt.sign({id : userFound[0]._id}, process.env.SECRET_KEY ,{ //  jwt.sign({id : userFound[0]._id} is the playload encript which we hide ) and process.env.SECRET_KEY is key which we can do unlock and lock from this.
        expiresIn :'30d' // this line do how many day or min expiress login happen
       }) 


        res.status(200).json({
            message:"User LogIn in Successfully.",
            token
        })
    }
    else {
        res.status(404).json({
            message: "Invalid Email and Password"
        })
    }
}

// Forgot Password
exports.forgotPassword = async(req,res) =>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            message : "Please Provide Email"
        })
    }
    // check if that Email is Registered or Not
    const userExist = await User.find({userEmail : email})
    if(userExist.length == 0){
        return res.status(404).json({
            message : "Email is Not Registered"
        })
    }

    // send otp to that email
    const otp = Math.floor(1000 + Math.random() * 9000) // it give a random otp and (1000 + Math.random() * 9000) give 4 digit otp and floor help to float number change to integer.
    userExist[0].otp = otp
    await userExist[0].save()
    await sendEmail({
        email : email,
        subject : "Your OTP for HospitalInventory ForgotPassword",
        message :  `Your OTP is ${otp}. Don't Share with Anyone.`
    })// sendEmail function import  and  invoke doing
    res.status(200).json({
        message : "OTP Sent Sucessfully"
    })
}

// Verify otp
exports.verifyOtp = async(req,res) => {
 const {email,otp} = req.body
 if(!email || !otp){
    return res.status(400).json({
        message : "Please Provide Email,OTP"
    })
 }
 //check email is registered or not
 const userExists = await User.find({userEmail : email})
 if(userExists.length == 0){
    return res.status(404).json({
        message : "Email is Not Registered"
    })
 }
 //check if that otp is correct or not of that email
 if(userExists[0].otp !== otp){
    res.status(404).json({
        message : "Invalid OTP"
    })
 }
 else{
    // Dispost the otp so cannot be used next time the same otp
    userExists[0].otp = undefined // in this line say if the otp is once used it will be undefined
    userExists[0].isOtpVerified = true
    await userExists[0].save()
    res.status(200).json({
        message : "OTP is Correct"
    })
 }
}

// resetPassword
exports.resetPassword = async(req,res) => {
    const {email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message : "Please Provide email, newPassword, confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(404).json({
            message : "NewPassword and ConfirmPassword doesn't Match"
        })
    }
    //check email is registered or not
    const userExists = await User.find({userEmail:email})
    if(userExists.length == 0){
        return res.status(404).json({
            message : " User Email is Not Registered"
        })
    }
    // if have not true it will return form here
    if(userExists[0].isOtpVerified !== true){
        return res.status(403).json({
            message : " You cannot perform this action"
        })
    }
// if have true it do verified or password change can do 
    userExists[0].userPassword = bcrypt.hashSync(newPassword,10)
    userExists[0].isOtpVerified = false;
    await userExists[0].save()

    res.status(200).json({
        message : "Password Changed Successfully"
    })
}