const User = require("../../model/userModel")
const Doctor = require("../../model/doctorSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const sendEmail = require("../../services/sendEmail")

const nodemailer = require('nodemailer')


// register

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email and password"
        })
    }

    // check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "User with that email already exists."
        });
    }

    //else

    try {
        // Create a new user
        await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "An error occurred while registering the user."
        });
    }
}


// login

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ // retrun do the work of else , else na garnu paros vanara return garako
            message: "Please provide Email, Password."
        })
    }

    // check if that email user exists or not
    const userFound = await User.find({ email: email })

    if (userFound.length == 0) { // is the ==0 then is not found
        // console.log("kkkkk")
        return res.status(401).json({ // 404 is not found
            // message: "User with that Email is Not Registered."
            message: "Invalid Email or Password."
        })
    }
    console.log(password)
    console.log(userFound[0].password)

    // password check
    const isMatched = bcrypt.compare(password, userFound[0].password)
    console.log(isMatched)

    if (isMatched) {
        // generate token
        // token is unique identifier which check the which person is login
        const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, { //  jwt.sign({id : userFound[0]._id} is the playload encript which we hide ) and process.env.SECRET_KEY is key which we can do unlock and lock from this.
            expiresIn: '1000' // this line do how many day or min expiress login happen
        })

        res.status(200).json({
            message: "LogIn Success",
            token
        })
    }
    else {
        console.log("jjjj")

        res.status(401).json({
            message: "Invalid Email and Password"
        })
    }
}


// another forgot password code 

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "Email is Not Registered" })
            }
            const token = jwt.sign({ id: user._id }, "jwtSecretKey", { expiresIn: "30d" })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,

                },

            });

            var mailOptions = {
                from: 'munasherpa31@gmail.com',
                to: 'munasherpa31@gmail.com',
                subject: 'Reset your password',
                text: `http://localhost:5173/resetPassword/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" })
                }
            });
        })

}


//reset password
exports.resetPassword = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    User.findOneAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Password Changed Successfully" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))

        }
    })
}

exports.getUserDetails = async (req, res) => {
    try {
      // Fetch all doctors from the database
      const user = await User.find();
      res.json(user);
    //   console.log(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({
        message: "An error occurred while fetching user details."
      });
    }
  };

  exports.getUserDetailsbyEmail = async (req, res) => {
    try {
        const { email } = req.body; // Assuming the email is passed as a route parameter
        
        // Fetch user details from the database based on the email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({
            message: "An error occurred while fetching user details."
        });
    }
};

// updateUserProfile function to update user details
exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email} = req.body;

    try {
        // Find the user by ID
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;

        

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "An error occurred while updating user profile" });
    }
};
