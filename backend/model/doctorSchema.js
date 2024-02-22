const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: Number},
    photo: {type: String},
    ticketPrice: { type: Number},
    role: {
        type: String,
    },

    // for doctor field only
    Specialization: { type: String},
    qunalifications: { type: Array},
    experences: { type: Array},
    bio: {type: String, maxLength: 50},
    about: {type: String},
    timeSlots: {type: Array},
    reviews: [{type: mongoose.Types.ObjectId, ref: "Review"}],
    averageRating: {type: Number, default: 0},
    totalRating: {type: Number, default: 0},
    isApproved: {type: String, enum: ["pending", "approved", "cancelled"],
default: "pending"},
appointments: [{type: mongoose.Types.ObjectId, ref: "Appointment"}],
});

// export default mongoose.model("Doctor", doctorSchema)
const Doctor = mongoose.model("Doctor",doctorSchema)
module.exports = Doctor