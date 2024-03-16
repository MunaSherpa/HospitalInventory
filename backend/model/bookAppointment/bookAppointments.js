const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientName: {
        type: String,
        required: [true, "Patient name must be provided"]
    },
    address: {
        type: String,
        required: [true, "Patient address must be provided"]
    },
    description: {
        type: String,
        required: [true, "Appointment description must be provided"]
    },
    appointmentDateTime: {
        type: Date,
        required: [true, "Appointment date and time must be provided"]
    },
    
    // doctor: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Doctor',
    //     required: [true, "Doctor reference must be provided"]
    // }
    doctorId: {
        type: Schema.Types.ObjectId,
        ref:"Doctor"
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
