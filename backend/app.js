const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()



require("dotenv").config() // tell node to use dotenv

connectDatabase(process.env.MONGO_URI) // Database connection


//test api to check if server is live or not 
app.get("/",(req,res) =>{
    res.status(200).json({
        message : " I am alive"
    })
})


//listen server
app.listen(3000, () =>{
    console.log("Server has started at PORT 3000")
})