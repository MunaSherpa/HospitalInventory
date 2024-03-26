const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


// register
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
exports.logOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User Logged out");

    } catch (error) {
        next(error);
    }
}