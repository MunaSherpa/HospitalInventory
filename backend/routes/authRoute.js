
const { loginUser, registerUser, forgotPassword, verifyOtp, resetPassword } = require("../controller/auth/authController")
const { registerDoctor } = require("../controller/doctor/doctor")

const router = require("express").Router()


//routes here
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotPassword").post(forgotPassword)
// router.route("/verifyOtp").post(verifyOtp)
router.route("/resetPassword/:id/:token").post(resetPassword)


//doctor routes here
router.route("/doctorRegister").post(registerDoctor)
router.route("/doctorRegister").get(registerDoctor)




module.exports = router