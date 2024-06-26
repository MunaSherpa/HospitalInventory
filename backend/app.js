const express = require("express")
const { connectDatabase } = require("./database/database")
const cors = require('cors');
const User = require("./model/userModel")
const app = express()

const http = require('http');
const socketIo = require('socket.io');


const server = http.createServer(app);
const io = socketIo(server);


// const cookieParser = require ("cookie-parser")


const { registerUser, loginUser } = require("./controller/auth/authController")



//ROUTE HERE
//route of authRote
const authRoute = require("./routes/routes")// this is require from wich export routes/authRoute
const router = require("./routes/routes");


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
app.use("", router )

// app.use('/api/chat', chatRoutes);




// Socket.io setup
const messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages to the client
  socket.emit('allMessages', messages);

  // Listen for new messages from the client
  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('newMessage', message); // Broadcast new message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



//listen server
app.listen(3001, () => {
    console.log("Server has started at PORT 3001")
})

