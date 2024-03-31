import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    Button
} from '@mui/material';
import Paper from "@mui/material/Paper";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '../doctor/BookAppointment.css';

const BookAppointment = () => {
    const { doctorid } = useParams();
    const [docData, setDocData] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const [formData, setFormData] = useState({
        doctorid: '',
        total_amount: '',
    });

    const [patientformData, setPatientformData] = useState({
        patient_name: '',
        patient_address: '',
        appointment_reason: '',
        appointmentDateandTime: selectedDateTime,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/doctorDetailbyId', { _id: doctorid });
                setDocData(response.data);
                setFormData(prevState => ({
                    ...prevState,
                    doctorid: response.data._id,
                    total_amount: response.data.price,
                }));
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };

        fetchData();
    }, [doctorid]);

    const handleBookAppointment = async () => {
        try {
            // Submit the form
            const responseData = await axios.post('http://localhost:3001/esewapay', formData);
            if (responseData.status === 200) {
                esewaCall(responseData.data.formData);
            }
        } catch (error) {
            console.error('Error submitting payment:', error);
            console.log(formData);
        }
    };

    const esewaCall = (responseData) => {
        var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);
        for (var key in responseData) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", responseData[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {docData ? (
                        <Card style={{ marginTop: '6rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>Doctor Details</span>
                                </Typography>
                            </div>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    style={{ width: '500px', height: '280px', borderRadius: '5px', marginTop: '1rem' }}
                                    image={`http://localhost:3001/${docData.image}`}
                                    alt={docData.name}
                                />
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>Dr. {docData.name}</span>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'normal', fontSize: '1rem' }}><b>Specialist: </b>{docData.specialist}</span>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'normal', fontSize: '1rem' }}><b>Experience: </b>{docData.workExperience}</span>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'normal', fontSize: '1rem' }}><b>Time: </b>{docData.time}</span>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'normal', fontSize: '1rem' }}><b>Appointment Fee: </b>Rs.{docData.price}</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box component={Paper} style={{ marginTop: '6rem' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>Patient Details</span>
                                </Typography>
                            </div>
                            <form>
                                <TextField
                                    name="name"
                                    label="Patient Name"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={patientformData.patient_name}
                                    onChange={e => setPatientformData(prevState => ({ ...prevState, patient_name: e.target.value }))}
                                />
                                <TextField
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={patientformData.patient_address}
                                    onChange={e => setPatientformData(prevState => ({ ...prevState, patient_address: e.target.value }))}
                                />
                                <TextField
                                    name="description"
                                    label="Reason of Appointment"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ marginBottom: '1rem' }}
                                    value={patientformData.appointment_reason}
                                    onChange={e => setPatientformData(prevState => ({ ...prevState, appointment_reason: e.target.value }))}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            label="Appointment Date and Time"
                                            value={selectedDateTime}
                                            onChange={(newValue) => setSelectedDateTime(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        class="btn"
                                        size="small"
                                        onClick={handleBookAppointment}
                                        style={{
                                            backgroundColor: 'green',
                                            marginTop: '1rem',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'darkgreen',
                                            },
                                        }}
                                    >
                                        Proceed to Payment
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BookAppointment;
