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

import KhaltiLogo from '../../assets/khaltilogo.svg';
import EsewaLogo from '../../assets/esewalogo.png';


const BookAppointment = () => {
    const { doctorid } = useParams();
    const [docData, setDocData] = useState([]);
    // const [selectedDateTime, setSelectedDateTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');


    const [paymentMethod, setPaymentMethod] = useState('');




    // const [formData, setFormData] = useState({
    //     doctorid: '',
    //     total_amount: '',
    // });

    // const [patientformData, setPatientformData] = useState({
    //     patient_name: '',
    //     patient_address: '',
    //     appointment_reason: '',
    //     appointmentDateandTime: '',
    // });



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

    const dateChange = (dateValue) => {
        console.log(dateValue);
        setSelectedDate(dateValue.$d.toLocaleDateString()); // Adjust date formatting
        setSelectedTime(dateValue.$d.toLocaleTimeString()); // Adjust time formatting

        bookAppointmentData.doctorid = docData._id;
        bookAppointmentData.doctorName = docData.name,
            bookAppointmentData.total_amount = docData.price,
            bookAppointmentData.specialist = docData.specialist,
            bookAppointmentData.doctorAvailability = docData.time,
            bookAppointmentData.workExperience = docData.workExperience,
            bookAppointmentData.appointmentDateandTime = `${selectedDate}` + " " + `${selectedTime}`

        console.log(bookAppointmentData);

    }
    console.log(selectedDate);
    console.log(selectedTime);

    const [bookAppointmentData, setbookAppointmentData] = useState({
        doctorid: docData._id,
        doctorName: docData.name,
        total_amount: docData.price,
        specialist: docData.specialist,
        doctorAvailability: docData.time,
        workExperience: docData.workExperience,
        patient_email: '',
        patient_name: '',
        patient_address: '',
        appointment_reason: '',
        appointmentDateandTime: '',
        paymentType: ''
    })


    const handleBookAppointment = async () => {
        try {
            // Submit the form
            if (paymentMethod == "esewa") {

                const responseData = await axios.post('http://localhost:3001/payment', bookAppointmentData);
                bookAppointmentData.paymentType = "esewa";

                if (responseData.status === 200) {
                    console.log(responseData.data.formData);
                    esewaCall(responseData.data.formData);
                }

            }
            else if (paymentMethod == "khalti") {
                console.log("Khalti is selected ")
                const responseData = await axios.post('http://localhost:3001/payment', bookAppointmentData);
                console.log(bookAppointmentData);
                console.log(`${paymentMethod}`)
                bookAppointmentData.paymentType = paymentMethod;
                if (responseData.status === 200) {
                    console.log(responseData.data.payload);
                }

            }

        } catch (error) {
            console.error('Error submitting payment:', error);
            console.log(bookAppointmentData);
        }
    };
    console.log(docData)
    console.log(docData._id)
    console.log(docData.name)
    console.log(docData.price)
    console.log(docData.specialist)
    console.log(docData.time)
    console.log(docData.workExperience)





   

    console.log(paymentMethod);
    bookAppointmentData.paymentType = paymentMethod;
    console.log(bookAppointmentData.paymentType);


    console.log(bookAppointmentData);
    console.log(bookAppointmentData.appointmentDateandTime);

    // console.log(docData);
    // console.log(bookAppointmentData);
    // console.log(bookAppointmentData.doctorid);
    // console.log(bookAppointmentData.paymentType);





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
                                    label="Patient Email"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={bookAppointmentData.patient_email}
                                    onChange={e => setbookAppointmentData(prevState => ({ ...prevState, patient_email: e.target.value }))}
                                />
                                <TextField
                                    name="name"
                                    label="Patient Name"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={bookAppointmentData.patient_name}
                                    onChange={e => setbookAppointmentData(prevState => ({ ...prevState, patient_name: e.target.value }))}
                                />

                                <TextField
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={bookAppointmentData.patient_address}
                                    onChange={e => setbookAppointmentData(prevState => ({ ...prevState, patient_address: e.target.value }))}
                                />
                                <TextField
                                    name="description"
                                    label="Reason of Appointment"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ marginBottom: '1rem' }}
                                    value={bookAppointmentData.appointment_reason}
                                    onChange={e => setbookAppointmentData(prevState => ({ ...prevState, appointment_reason: e.target.value }))}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            label="Appointment Date and Time"
                                            // value={selectedDateTime}
                                            onChange={(newValue) => dateChange(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        height: '25%',
                                    }} >

                                        <Typography gutterBottom variant="h5" component="div">
                                            Select Payment Method:
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="esewa"
                                                    name="paymentMethod"
                                                    value="esewa"
                                                    checked={paymentMethod === 'esewa'}
                                                    onChange={() => setPaymentMethod('esewa')}
                                                />
                                                <img style={{ width: "10%" }} className='profile' alt='profilepicture' src={EsewaLogo} />

                                            </div>
                                            {/* <div>
                                                <input
                                                    type="radio"
                                                    id="khalti"
                                                    name="paymentMethod"
                                                    value="khalti"
                                                    checked={paymentMethod === 'khalti'}
                                                    onChange={() => setPaymentMethod('khalti')}
                                                />
                                                <img style={{ width: "40%" }} className='profile' alt='profilepicture' src={KhaltiLogo} />

                                            </div> */}

                                        </div>


                                    </Box>
                                </div>
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