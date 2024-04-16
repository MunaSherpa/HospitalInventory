import React from 'react'
import Nav from '../Nav';
import Sidenav from '../Sidenav';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Container,
    Button,
    Paper
} from '@mui/material';



const EditAppointment = () => {
    const { appID } = useParams();
    const [appointment, setAppointment] = useState([]);
    const [newAppointment, setnewAppointment] = useState([]);


    console.log(appID);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/getappointmentbyid', { _id: appID });
                console.log(response.data.appData)
                setAppointment(response.data.appData);
            } catch (error) {
                console.error('Error fetching appointment details details:', error);
            }
        };

        fetchData();
    }, [appID]);
    console.log(appointment);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to update the appointment details
            await axios.post('http://localhost:3001/updateappointment', appointment);
            // Optionally, you can redirect the user to another page after successful update
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    return (
        <>
            <Nav />
            <Box height={30} />
            <Sidenav />
            <div className='outer-div' style={{ display: 'flex', padding: '1rem', paddingLeft: '5rem' }}>
                <div className='left-div' style={{ width: '50rem', height: '89vh' }} >

                    <div className='display-details'>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                {appointment ? (
                                    <Card style={{ width: '40rem', marginTop: '6rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'bold' }}>Appointment Details</span>
                                            </Typography>
                                        </div>


                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Patient Name: </b> {appointment.patientName}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Patient Email: </b> {appointment.patientEmail}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Doctor Name: </b> {appointment.doctorName}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Doctor Specialist: </b> {appointment.specialist}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Appointment Reason: </b> {appointment.appointmentReason}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Appointment Date and Time: </b> {appointment.appointmentDateAndTime}</span>
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'normal' }}><b>Payment Via: </b> {appointment.paymentType}</span>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='right-div' style={{ width: '50rem', height: '89vh' }}>
                    <div className='display-details'>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                {appointment ? (
                                    <Card style={{ width: '40rem', marginTop: '6rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <span style={{ color: 'black', fontWeight: 'bold' }}>Edit Appointment Details</span>
                                            </Typography>
                                        </div>


                                        <CardContent>
                                            <Container maxWidth="md">
                                                <Paper elevation={3} style={{ padding: '2rem' }}>
                                                    <form onSubmit={handleSubmit}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={6}>
                                                                <b><label>Patient Name: </label></b>
                                                                <TextField
                                                                    // label="Patient Name"
                                                                    type="text"
                                                                    name="Patient Name"
                                                                    value={newAppointment.patientName}
                                                                    onChange={handleInputChange}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <b><label>Patient Email: </label></b>

                                                                <TextField
                                                                    // label="Patient Email"
                                                                    type="text"
                                                                    name="Patient Email"
                                                                    value={newAppointment.patientEmail}
                                                                    onChange={handleInputChange}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <b><label>Doctor Name: </label></b>

                                                                <TextField
                                                                    // label="Doctor Name"
                                                                    type="text"
                                                                    name="Doctor Name"
                                                                    value={newAppointment.doctorName}
                                                                    onChange={handleInputChange}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <b><label>Appointment Date and Time: </label></b>

                                                                <TextField
                                                                    // label="Appointment Date and Time"
                                                                    type="datetime-local"
                                                                    name="appointmentDateAndTime"
                                                                    value={newAppointment.appointmentDateAndTime}
                                                                    onChange={handleInputChange}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <b><label>Appointment Reason: </label></b>

                                                                <TextField
                                                                    // label="Appointment Reason"
                                                                    type="text"
                                                                    name="appointmentReason"
                                                                    value={newAppointment.appointmentReason}
                                                                    onChange={handleInputChange}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>


                                                        </Grid>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button variant="contained" type="submit" style={{ backgroundColor: '#4caf50', marginTop: '2rem' }}>
                                                                Save Changes
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </Paper>
                                            </Container>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </div>

                </div>


            </div>
        </>
    )
}

export default EditAppointment