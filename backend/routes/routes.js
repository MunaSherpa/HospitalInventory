const { loginUser, registerUser, forgotPassword, verifyOtp, resetPassword, getUserDetails, getUserDetailsbyEmail, logOut, updateUserProfile } = require("../controller/auth/authController")
const { registerDoctor, getDoctorDetails, getDoctorDetailbyId } = require("../controller/doctor/doctor")
const { bookAppointment,verifyPayment, khaltiPayment, eSewaPayment, onlinePayment, handleEsewaSuccess  } = require("../controller/bookAppointment/bookAppointment")
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controller/blog/Blog")
const { accessChat } = require("../controller/chat/chatController")
const { createProduct, getAllProducts, getProductDetailById, deleteProductById, updateProductById } = require("../controller/pharmacy/product")
const { addToCart, getUserCart, removeFromCart, calculateTotal } = require("../controller/pharmacy/cart")
const { fetchAppointment, deleteAppointmentbyId, getappointmentbyid } = require("../controller/bookAppointment/ViewAppointment")


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
// router.route("/bookAppointment").post(bookAppointment);
// router.route("/bookAppointment/:id").get(bookAppointment);
// router.route("/verifyPayment/:id").get(verifyPayment);

//payment route here
router.route("/payment").post(onlinePayment);
router.route("/esewasuccess").get(handleEsewaSuccess);


// blog routes here
router.route("/createBlog").post(createBlog);
router.route("/allBlogs").get(getAllBlogs);
router.route("/singleBlog/:id").get(getBlogById);
router.route("/singleBlog/:id/update").put(updateBlog);
router.route("/singleBlog/:id/delete").delete(deleteBlog);


// chat routes here
// router.route("/chat").post(protect, accessChat);
router.route("/chat").post(accessChat);
// router.route("/chat").get(fetchChat);
// router.route("/rename").put(renameGroup);
// router.route("/groupremove").put(removeFromGroup);
// router.route("/groupadd").put(addToGroup);



//fetchAppointmets
router.route("/fetchappointments").get(fetchAppointment);
//deleteAppointmentsbyId
router.route("/deleteappointmentbyid").delete(deleteAppointmentbyId);
router.route("/getappointmentbyid").post(getappointmentbyid);


//product routes here
router.route("/productCreated").post(createProduct)
router.route("/productDetails").get(getAllProducts)
router.route("/productDetailbyId").post(getProductDetailById)
router.route("/singleProduct/:id").delete(deleteProductById);
router.route("/singleProduct/:id").put(updateProductById);




// Cart routes
router.route("/addToCart").post(addToCart)
router.route("/getUserCart").get(getUserCart)
router.route("/cartDetailById").post(createProduct)
router.route("/removeFromCart/:cartItemId").delete(removeFromCart)
router.route("/calculateTotal").get(calculateTotal)
// router.route("/singleCart/:id").put(createProduct)















module.exports = router