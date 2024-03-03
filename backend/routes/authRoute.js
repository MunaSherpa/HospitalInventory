
const { loginUser, registerUser, forgotPassword, verifyOtp, resetPassword, getUserDetails, getUserDetailsbyEmail, logOut, updateUserProfile } = require("../controller/auth/authController")
const { registerDoctor, getDoctorDetails } = require("../controller/doctor/doctor")

const router = require("express").Router()


//routes here
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword)
// router.route("/verifyOtp").post(verifyOtp)
router.route("/resetPassword/:id/:token").post(resetPassword)
router.route("/userDetails").get(getUserDetails)
router.route("/userDetailsbyEmail").post(getUserDetailsbyEmail)
router.route("/updateUserProfile").post(updateUserProfile)
router.route("/logout").get(logOut)





//doctor routes here
router.route("/doctorRegister").post(registerDoctor)
router.route("/doctorDetails").get(getDoctorDetails)




module.exports = router