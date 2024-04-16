const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctorId: {
        type: String,
        required: [true, "Doctor ID must be provided"]
    },
    doctorName: {
        type: String,
        required: [true, "Doctor name must be provided"]
    },
    specialist: {
        type: String,
        required: [true, "Specialist must be provided"]
    },
    doctorAvailability: {
        type: String,
        required: [true, "Doctor availability must be provided"]
    },
    workExperience: {
        type: String,
        required: [true, "Work experience must be provided"]
    },
    patientEmail: {
        type: String,
        required: [true, "Patient Email must be provided"]
    },
    patientName: {
        type: String,
        required: [true, "Patient name must be provided"]
    },
    patientAddress: {
        type: String,
        required: [true, "Patient address must be provided"]
    },
    appointmentReason: {
        type: String,
        required: [true, "Appointment reason must be provided"]
    },
    appointmentDateAndTime: {
        type: String,
        required: [true, "Appointment date and time must be provided"]
    },
    paymentType: {
        type: String,
        required: [true, "Payment type must be provided"]
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount must be provided"]
    },
    esewaTransactionUUID: {
        type: String,
        required: [true, "eSewa transaction UUID must be provided"]
    },
    esewaSignature: {
        type: String,
        required: [true, "eSewa signature must be provided"]
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;