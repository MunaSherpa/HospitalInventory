const Doctor = require("../../model/admin/doctor.js");
const Appointment = require("../../model/bookAppointment/bookAppointments.js"); 
const bcrypt = require('bcrypt');
// const User = require("../../model/userModel.js"); 
const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');



// Function to book appointment
exports.bookAppointment = async (req, res) => {
        try {
        const { patientName, address, description, doctorId, appointmentDateTime } = req.body;
        const doctor = await Doctor.findById(doctorId); // Fetch doctor details based on doctorId
        if (!doctor) { // If doctor not found, return 404 error
            return res.status(404).json({ error: "Doctor not found" });
        }
        // const user = req.user; 
        const appointmentDetails = {
            patientName,
            address,
            description,
            appointmentDateTime,
            doctor: doctorId,
            // userEmail: user.email 
        };
        const appointment = await Appointment.create(appointmentDetails); // Create appointment with provided details
        
        // Payment handling code
        const uid = uuidv4(); // Generate unique transaction ID
        const message = `total_amount=${doctor.price},transaction_uuid=${uid},product_code=EPAYTEST`; // Construct message for payment verification
        const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET); // Generate signature for payment verification
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash); // Convert signature to Base64
        // Redirect to payment gateway or render payment page with necessary details
        // res.json("payment", { 
            res.status(200).json({ 
            appointmentId: appointment._id, // Pass appointment ID for tracking
            doctorName: doctor.name, // Pass doctor name for display
            appointmentDateTime, // Pass appointment date and time for display
            price: doctor.price, // Pass appointment price for display
            uid, // Pass transaction ID for payment verification
            signature: hashInBase64 // Pass signature for payment verification
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Error booking appointment' });
    }
}

// Function to handle payment verification
exports.verifyPayment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        // const { appointmentId } = req.body; // Extract appointment ID from request body
        const appointment = await Appointment.findById(appointmentId); // Fetch appointment details based on appointment ID
        if (!appointment) { // If appointment not found, return 404 error
            return res.status(404).json({ error: "Appointment not found" });
        }
        // Perform Esewa payment verification
        const data = req.query.data; // Extract payment verification data
        let decodedString = atob(data); // Decode payment verification data
        const obj = JSON.parse(decodedString); // Parse payment verification data to JSON
        decodedString = JSON.parse(decodedString);
        switch (decodedString.status) { // Check payment status
            case "COMPLETE": // If payment status is complete
                const user_id = req.session.user._id; // Get user ID from session
                const doctor = await Doctor.findById(appointment.doctor); // Fetch doctor details
                const message = `transaction_code=${decodedString.transaction_code},status=${decodedString.status},total_amount=${decodedString.total_amount},transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code},signed_field_names=${decodedString.signed_field_names}`; // Construct message for payment verification
                const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET); // Generate signature for payment verification
                const hashInBase64 = CryptoJS.enc.Base64.stringify(hash); // Convert signature to Base64
                const result = hashInBase64 == decodedString.signature; // Verify signature
                if (result == false) { // If signature doesn't match, throw error
                    throw "Hash value not matched";
                }
                await Book.create({ // Create order record in database
                    bookBy: user_id, // Associate order with user
                    doctorId: doctor.id, // Associate order with doctor
                    appointmentDateTime: appointment.appointmentDateTime, // Associate order with appointment date and time
                    price: doctor.price // Associate order with appointment price
                });
                // Send notification email
                await sendNotificationEmail(req.session.user.email, doctor.name, doctor.specialist, appointment.appointmentDateTime, doctor.price);
                res.redirect("/doctor"); // Redirect user to dashboard after successful payment verification
                break;

            // Handle other Esewa statuses if needed

            default:
                res.status(400).json({ error: 'Invalid Esewa status' });
                break;
        }
    } catch (error) {
        console.error("Error verifying Esewa payment:", error);
        res.status(500).json({ error: "Error verifying Esewa payment" });
    }
}

// Function to send notification email
const sendNotificationEmail = async (email, doctorName, specialist, appointmentDateTime, price) => {
    // Create nodemailer transporter with SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Appointment Confirmation',
        text: `Dear User,\n\nYour appointment with Dr. ${doctorName} (${specialist}) is confirmed.\nAppointment Date and Time: ${appointmentDateTime}\n\nTotal Amount: ${price}\n\nThank you.`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent');
    } catch (error) {
        console.error('Error sending notification email:', error);
    }
};
