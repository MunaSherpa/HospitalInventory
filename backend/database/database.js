const mongoose = require("mongoose")



exports.connectDatabase = async(URI)=>{
    // connecting to database 
 await mongoose.connect(URI)
 console.log("Database connected successfully")
 

}