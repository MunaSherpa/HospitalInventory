const nodemailer = require("nodemailer")
// const { options } = require("../routes/authRoute")

const sendEmail = async (options) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,

        },

    });


    const mailOptions = {
        from :" Muna sherpa <munasherpa31@gmail.com>",
        to: options.email,
        subject : options.subject,
        // subject: 'Reset your password',
        // text: options.message,
        text: 'http://localhost:5173/resetPassword/${user._id}/'
    };

    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;