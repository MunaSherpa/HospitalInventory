module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define('appointment', {
        patientName: {
            type: Sequelize.STRING
        },
        specialist: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.STRING
        },
    })
    return Appointment
}