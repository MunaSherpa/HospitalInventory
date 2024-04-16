const Appointment = require("../../model/bookAppointment/bookAppointments.js");

exports.fetchAppointment = async (req, res) => {

    try {
        // Fetch all doctors from the database
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (error) {
        console.error("Error fetching appointment details:", error);
        res.status(500).json({
            message: "An error occurred while fetching appointment details."
        });
    }

}

exports.deleteAppointmentbyId = async (req, res) => {
    const { _id } = req.body; // Assuming the email is passed as a route parameter

    try {

        console.log(_id)
        // Fetch doctorid details from the database based on the id
        const appointmentData = await Appointment.findOne({ _id });

        if (!appointmentData) {
            return res.status(404).json({ message: 'Appointment not found' });
        } else {
            await Appointment.deleteOne({ _id });
            return res.json({ message: 'Appointment deleted successfully' });
        }
        
    } catch (error) {
        console.error("Error fetching doctorid details:", error);
        res.status(500).json({
            message: "An error occurred while fetching doctorid details."
        });
    }
}

exports.getappointmentbyid = async (req, res) => {
    const { _id } = req.body; // Assuming the email is passed as a route parameter

    try {

        console.log(_id)
        // Fetch doctorid details from the database based on the id
        const appointmentData = await Appointment.findOne({ _id });

        if (!appointmentData) {
            return res.status(404).json({ message: 'Appointment not found' });
        } else {
            console.log(appointmentData);
            return res.json({ message: 'Appointment fetched success', appData: appointmentData });
        }
        
    } catch (error) {
        console.error("Error fetching appointment details:", error);
        res.status(500).json({
            message: "An error occurred while fetching doctorid details."
        });
    }
}