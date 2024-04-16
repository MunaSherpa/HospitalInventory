const Doctor = require("../../model/doctor/doctor.js");
const Appointment = require("../../model/bookAppointment/bookAppointments.js");
const bcrypt = require('bcrypt');
// const User = require("../../model/userModel.js"); 
const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const crypto = require("crypto")




let bookAppointmentData;

exports.handleEsewaSuccess = async (req, res) => {
    try {
        const { data } = req.query;
        console.log(data);

        const decodedData = JSON.parse(
            Buffer.from(data, "base64").toString("utf-8")
        );

        console.log(decodedData);

        if (decodedData.status !== "COMPLETE") {
            console.log("PAYMENT INCOMPLETE");
            return res.status(400).json({ message: "Payment ERROR" });
        } else {
            const message = decodedData.signed_field_names
                .split(",")
                .map((field) => `${field}=${decodedData[field] || ""}`)
                .join(",");

            console.log("Constructed message for signature verification:", message);

            const secret_key = "8gBm/:&EnhH.1/q";
            const sigMessage = generateSignature(message, secret_key);

            console.log("Generated signature:", sigMessage);

            if (sigMessage !== decodedData.signature) {
                res.json({ message: "Integrity Error" })
            } else {
                console.log("Payment Success Data can be stored in the database");
                console.log("Updated bookAppointmentData:", JSON.stringify(bookAppointmentData));

                const appointmentData = {
                    doctorId: bookAppointmentData.doctorid,
                    doctorName: bookAppointmentData.doctorName,
                    specialist: bookAppointmentData.specialist,
                    doctorAvailability: bookAppointmentData.doctorAvailability,
                    workExperience: bookAppointmentData.workExperience,
                    patientEmail: bookAppointmentData.patient_email,
                    patientName: bookAppointmentData.patient_name,
                    patientAddress: bookAppointmentData.patient_address,
                    appointmentReason: bookAppointmentData.appointment_reason,
                    appointmentDateAndTime: bookAppointmentData.appointmentDateandTime,
                    paymentType: bookAppointmentData.paymentType,
                    totalAmount: parseFloat(bookAppointmentData.total_amount),
                    esewaTransactionUUID: decodedData.transaction_uuid,
                    esewaSignature: decodedData.signature
                };

                console.log(appointmentData);

                await Appointment.create(appointmentData);

                await sendNotificationEmail(bookAppointmentData.patient_email, bookAppointmentData.doctorName, bookAppointmentData.specialist, bookAppointmentData.appointmentDateandTime, bookAppointmentData.total_amount, bookAppointmentData.patient_name, bookAppointmentData.patient_address, bookAppointmentData.appointment_reason,);

                console.log("Appointment data saved successfully");

                // res.redirect("http://localhost:5173/bookappointment")

                return "SUCCESS";
            }
        }
    } catch (error) {
        console.log("Error handling eSewa success:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.onlinePayment = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);
        console.log("Book Appointment Data")
        console.log(typeof(payload));
        console.log(payload.appointmentDateAndTime);


        bookAppointmentData = payload;

        if (payload.paymentType == "esewa") {
            console.log("Esewa Payment Initiated");

            const uid = uuidv4();
            const secret_key = "8gBm/:&EnhH.1/q";

            const message = `total_amount=${payload.total_amount},transaction_uuid=${uid},product_code=EPAYTEST`;

            const hash = generateSignature(message, secret_key);
            console.log(uid);
            console.log(hash);

            const formData = {
                amount: payload.total_amount,
                tax_amount: '0',
                total_amount: payload.total_amount,
                product_delivery_charge: "0",
                product_service_charge: "0",
                signature: hash,
                transaction_uuid: uid,
                product_code: 'EPAYTEST',
                success_url: 'http://localhost:3001/esewasuccess', // success URL
                failure_url: 'https://google.com', // failure URL
                signed_field_names: 'total_amount,transaction_uuid,product_code'
            };

            console.log("Data Sent Successfully");
            console.log(formData);
            res.status(200).json({ success: true, message: 'Payment initiated successfully', formData });
        } else if (payload.paymentType == "khalti") {
            console.log("Khalti Payment Initiated");
        }
    } catch (error) {
        console.error('Error initiating payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Failed to initiate payment' });
    }
}

// Function to generate signature
function generateSignature(message, secret_key) {
    console.log("Generating SIGNATURE!!!");
    console.log(message);
    const hash = CryptoJS.HmacSHA256(message, secret_key);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
}









// Function to send notification email
const sendNotificationEmail = async (email, doctorName, specialist, appointmentDateTime, price, patientName, patientAddress, appointmentReason ) => {
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
        text: `Dear Patient,\n\nYour appointment with Dr. ${doctorName} (${specialist}) is confirmed.\nAppointment Date and Time: ${appointmentDateTime}\n\nTotal Amount: ${price}\n\nPatient Name: ${patientName} \n\nPatient Address: ${patientAddress}\n\n Appointment Reason: ${appointmentReason}   \n\nThank you.`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent');
    } catch (error) {
        console.error('Error sending notification email:', error);
    }
};