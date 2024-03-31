
const { loginUser, registerUser, forgotPassword, verifyOtp, resetPassword, getUserDetails, getUserDetailsbyEmail, logOut, updateUserProfile } = require("../controller/auth/authController")
const { registerDoctor, getDoctorDetails, getDoctorDetailbyId } = require("../controller/doctor/doctor")
const { bookAppointment,verifyPayment, khaltiPayment, eSewaPayment  } = require("../controller/bookAppointment/bookAppointment")
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controller/blog/Blog")


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
router.route("/doctorDetailbyId").post(getDoctorDetailbyId)


//bookAppointment routes here
router.route("/bookAppointment").post(bookAppointment);
router.route("/bookAppointment/:id").get(bookAppointment);
router.route("/verifyPayment/:id").get(verifyPayment);

// blog routes here
router.route("/createBlog").post(createBlog);
router.route("/allBlogs").get(getAllBlogs);
router.route("/singleBlog/:id").get(getBlogById);
router.route("/singleBlog/:id/update").post(updateBlog);
router.route("/singleBlog/:id/delete").delete(deleteBlog);

// router.put('/singleBlog:id/update', blogController.updateBlog); 






router.route("/esewapay").post(eSewaPayment);






module.exports = router