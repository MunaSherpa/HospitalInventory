const mongoose = require('mongoose')
const Schema = mongoose.Schema



const doctor = new Schema({
    image: {
        type: String,
        required: [true, "image must be provided"]
    },

    name: {
        type: String,
        required: [true, "Name must be provided"]
    },
    email: {
        type: String,
        required: [true, "email must be provided"]
    },

    specialist: {
        type: String,
        required: [true, 'specialist must be provided'] // email aunu paro vanako true

    },

    workExperience:  {
        type: String,
        required: [true, " workexperience must be provided "]
    },

    education:  {
        type: String,
        required: [true, " education must be provided "]
    },

    price:  {
        type: String,
        required: [true, ]
    },
    time:  {
        type: String,
        required: [true, ]
    },

})



const Doctor = mongoose.model("Doctor", doctor)
module.exports = Doctor
