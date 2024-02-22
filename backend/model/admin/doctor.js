module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define('doctor', {
        image: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        specialist: {
            type: Sequelize.STRING
        },
        fees: {
            type: Sequelize.STRING
        },
        workExperience : {
            type: Sequelize.STRING
        },
        education : {
            type: Sequelize.STRING
        }
        
    })
    return Doctor
}