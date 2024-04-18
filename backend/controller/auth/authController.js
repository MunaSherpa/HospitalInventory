const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { sendGoodResponse, sendBadResponse } = require("../../helpers/helper");
const { validationResult } = require('express-validator');



//register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email, and password"
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with that email already exists."
            });
        }

        // Create a new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            return res.status(400).json({
                message: "User with that email already exists."
            });
        } else {
            // Other database errors
            console.error("Error registering user:", error);
            res.status(500).json({
                message: "An error occurred while registering the user."
            });
        }
    }
};








// module.exports.registerUser = async function (req, res) {
//     const result = validationResult(req);
//     if (!result.isEmpty()) return sendBadResponse(res, result.array({ onlyFirstError: true }));
  
//     const { email, password, name,  } = req.body;
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email }); // Check for existing user
  
//       if (existingUser) {
//         return sendBadResponse(res, [{ path: 'email', msg: 'User with this email already exists' }]);
//       }
  
//       // Hash the password before saving it to the database
//       const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
  
//       const newUser = new User({ // Create a new user instance
//         email,
//         password: hashedPassword,
//         name,
        
//         // Add other user properties as needed
//       });
  
//       const savedUser = await newUser.save(); // Save the user to the database
  
//       // Generate JWT token
//       const token = jwt.sign({ userId: savedUser.id }, jwtSecretKey, { expiresIn: '1h' });
  
//       // Response data
//       const data = {
//         status: 'success',
//         message: 'User registered successfully.',
//         data: { ...savedUser.toJSON(), token },
//         token
//       };
  
//       sendGoodResponse(res, data);
//     } catch (error) {
//       console.error('Error during registration:', error);
//       return sendBadResponse(res, [{ msg: 'Internal server error' }]);
//     }
//   }
  






// login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password."
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Email is not registered."
            });
        }

        // Check password
        const isMatch =  bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

            // const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            const token = jwt.sign({ id: user._id }, "jwtSecretKey", { expiresIn: "1d" })


            // Store user object in session
        // req.session.user = user;

        

        res.status(200).json({
            message: "LogIn Success",
            token
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            message: "An error occurred while logging in."
        });
    }
};













// module.exports.loginUser = async (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) return sendBadResponse(res, result.array({ onlyFirstError: true }));
  
//     try {
//       const { email, password, } = req.body;
//       const jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//       const user = await User.findOne({ email });
//       if(!user) throw "Now user found";
  
//       // Compare the provided password with the hashed password in the database
//       const passwordMatch = await bcrypt.compare(password, user.password);
  
//       if (!passwordMatch) {
//         return sendBadResponse(res, [{ msg: 'Invalid email or password' }]);
//       }
  
  
//       const token = jwt.sign({ userId: user.id }, jwtSecretKey);
//       const data = {
//         status: "success",
//         message: "User logged in successfully.",
//         data: { ...user.toJSON(), token },
//         token
//       }
//       sendGoodResponse(res, data);
//     } catch (e) {
//       console.log(e);
//       sendGoodResponse(res, { msg: "server error", error: e }, 500)
//     }
  
//   }
  




module.exports.emailLoginAdmin = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return sendBadResponse(res, result.array({ onlyFirstError: true }));

        const { email, password, } = req.body;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const user = await User.findOne({email: email, role: "admin" });

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return sendBadResponse(res, [{ msg: 'Invalid email or password' }]);
        }


        const token = jwt.sign(user.toJSON(), jwtSecretKey);
        const data = {
            status: "success",
            message: "Admin logged in successfully.",
            data: { ...user.toJSON(), token },
            token
        }
        sendGoodResponse(res, data);
    } catch (e) {
        sendBadResponse(rez, {msg: "server error"}, 500);
    }
}




// another forgot password code 
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "Email is not registered." });
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
                from: process.env.EMAIL_USER,
                to: email,
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

// updateUserProfile 
exports.updateUserProfile = async (req, res) => {
    const { email, name, userEmail } = req.body;
    console.log(email)
    // console.log(name)
    // console.log(userEmail)
    const role = "patient"

    try {
        // Find the user by email
        let user = await User.findOne({ email });
        // let user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's name and password if provided
        if (name) {
            user.name = name;
        }
        if (userEmail) {
            user.email = userEmail;
        }
        if (role) {
            user.role = role; // Update the user's role if provided
        }
        // Save the updated user
        await user.save();

        // res.status(200).json(user);
        // res.status(200).json(user);
        res.status(200).json({ message: "Profile update successfully"});
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "An error occurred while updating user profile" });
    }
};


//logout
// exports.logOut = async (req, res, next) => {
//     try {
//         res.clearCookie("access_token");
//         res.status(200).json("User Logged out");

//     } catch (error) {
//         next(error);
//     }
// }


// logoutController.js



exports.logOut = async (req, res, next) => {
    try {
        // Assuming you're using JWT tokens for authentication
        // Clearing any token or session data on the server-side
        // For example, if using JWT tokens, you don't need to do anything here
        // JWT tokens are stateless and are typically cleared on the client-side

        // Sending a success response
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        // If any error occurs during logout, pass it to the error handling middleware
        next(error);
    }
};
