const express = require("express")
const { connectDatabase } = require("./database/database")
const cors = require('cors');
const User = require("./model/userModel")
const app = express()

// const cookieParser = require ("cookie-parser")


const { registerUser, loginUser } = require("./controller/auth/authController")
// const {multer, storage, imageStorage} = require("./config/multerConfig")
// const upload = multer({ storage: storage });


//ROUTE HERE
//route of authRote
const authRoute = require("./routes/authRoute")// this is require from wich export routes/authRoute
const userRoute = require("./routes/userRoute");
const router = require("./routes/authRoute");


//Route end here


//Tell Node to use dotenv
require("dotenv").config() // tell node to use env file. it use the MONGO_URI variable

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'));
app.use(express.static("uploads")); // databasema null ako thauma link datakacha


// app.use(cookieParser())

//DataBase Connection
connectDatabase(process.env.MONGO_URI) // Database connection. if we cannot require("dotenv").config() it cannot access (process.env.MONGO_URI) 


app.use("",authRoute)// this line use the routes of authRoute and  middleware applied and app.use("",authRoute) in here empty string ""   used all the api is add in this first empty"" of authRoute
// app.use("", userRoute )
// app.use("/api/v1/users", userRoute)
// const uploadImage = multer({ storage: imageStorage });
// app.post('/doctorRegister', uploadImage.single("image"), authRoute) //upload.single('image') is middleware




//listen server
app.listen(3001, () => {
    console.log("Server has started at PORT 3001")
})

