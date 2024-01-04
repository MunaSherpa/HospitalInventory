const mongoose = require("mongoose")



exports.connectDatabase = async(URI)=>{ //(URI) is a parameter passed to the connectDatabase function. and pass the URI agrument in app.js connectDatabase.
    // connecting to database 
 await mongoose.connect(URI)// wait the untill database is not connect
 console.log("Database connected successfully")
}