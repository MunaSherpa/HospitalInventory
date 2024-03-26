// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//     Typography,
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     CardMedia,
//     TextField,
//     Container,
//     Button
// } from '@mui/material';
// import Paper from "@mui/material/Paper";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// const BookAppointment = () => {
//     const { doctorid } = useParams();
//     const [userData, setUserData] = useState([]);
//     const [selectedDateTime, setSelectedDateTime] = useState(null);
//     // const [docName, setDocName] = useState("");
//     // const [docSchedule, setDocSchedule] = useState("");
//     // const [docSpecialist, setDocSpecialist] = useState("");

    

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post('http://localhost:3001/doctorDetailbyId', { _id: doctorid });
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching doctor details:', error);
//             }
//         };

//         fetchData();
//     }, [doctorid]);


//     return (
//         <Container>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     {userData ? (
//                         <Card style={{ marginTop: '6rem' }}>
//                             <Box style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <CardMedia
//                                     component="img"
//                                     height="200"
//                                     style={{ width: '500px', height: '280px', borderRadius: '5px', marginTop: '1rem' }}
//                                     // style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '5px', marginTop: '1rem' }}
//                                     image={`http://localhost:3001/${userData.image}`}
//                                     alt={userData.name}
//                                 />
//                             </Box>
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Dr. {userData.name}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Specialist:</span> <span>{userData.specialist}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Email:</span> <span>{userData.email}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Work Experience:</span> <span>{userData.workExperience}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Education:</span> <span>{userData.education}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Price:</span> <span>{userData.price}</span>
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" component="p">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Time:</span> <span>{userData.time}</span>
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     ) : (
//                         <Typography>Loading...</Typography>
//                     )}
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Box component={Paper} style={{ marginTop: '6rem' }}>
//                         <CardContent>
//                             <Box style={{ display: 'flex', justifyContent: 'center',  }}>
//                             <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: '1.5rem' }}>
//                                 Patient Details
//                             </Typography>
//                             </Box>
//                             <TextField
//                                 name="name"
//                                 label="Name"
//                                 fullWidth
//                                 sx={{ marginBottom: '1rem' }}
//                             />
//                             <TextField
//                                 name="address"
//                                 label="Address"
//                                 fullWidth
//                                 sx={{ marginBottom: '1rem' }}
//                             />
//                             <TextField
//                                 name="description"
//                                 label="Description"
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 sx={{ marginBottom: '1rem' }}
//                             />
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['DateTimePicker']}>
//                                     <DateTimePicker
//                                         label="Appointment Date and Time"
//                                         value={selectedDateTime}
//                                         onChange={(newValue) => setSelectedDateTime(newValue)}
                                       
//                                     />
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                             <Box style={{ display: 'flex', justifyContent: 'center' }}>

//                                         <Button
//                                             size="small"
//                                             onClick={() => handleBookAppointment(doctor._id)}
//                                             style={{
//                                                 backgroundColor: 'green',
//                                                 marginTop: '1rem',
//                                                 color: 'white',
//                                                 '&:hover': {
//                                                     backgroundColor: 'darkgreen',
//                                                 },
//                                             }}
//                                         >
//                                             Book An Appointment
//                                         </Button>

//                                     </Box>
//                         </CardContent>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default BookAppointment;





// import CryptoJS from 'crypto-js'; 

// import React, { useState } from 'react';
// import axios from 'axios';

// const BookAppointment = () => {
//   const [paymentData, setPaymentData] = useState({
//     amount: "100",
//     tax_amount: "0",
//     total_amount: "100",
//     transaction_uuid: "", // Will be generated dynamically
//     product_code: "EPAYTEST",
//     product_service_charge: "0",
//     product_delivery_charge: "0",
//     success_url: "https://google.com",
//     failure_url: "https://facebook.com",
//     signed_field_names: "total_amount,transaction_uuid,product_code",
//     signature: "", // Will be generated dynamically
//     secret: "8gBm/:&EnhH.1/q" // Your eSewa secret key
//   });

//   console.log(paymentData);

//   const initiatePayment = async () => {
//     try {
//       // Generate dynamic fields
//       const formattedTime = new Date().toISOString().slice(2, 10).replace(/-/g, '') +
//         '-' + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
//       const transaction_uuid = formattedTime;

//       // Update paymentData with dynamic fields
//       setPaymentData(prevState => ({
//         ...prevState,
//         transaction_uuid: transaction_uuid
//       }));

//       // Generate signature
//       const { total_amount, product_code, secret } = paymentData;
//       const dataForSignature = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
//       const signature = CryptoJS.HmacSHA256(dataForSignature, secret).toString(CryptoJS.enc.Base64);

//       // Update paymentData with signature
//       setPaymentData(prevState => ({
//         ...prevState,
//         signature: signature
//       }));

//       console.log(paymentData);

//       // Send payment request to backend
//       const response = await axios.post('http://localhost:3001/esewapay', paymentData);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error initiating payment:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={initiatePayment}>Initiate Payment</button>
//     </div>
//   );
// };

// export default BookAppointment;







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
import CryptoJS from 'crypto-js'; 

const BookAppointment = () => {
    const { doctorid } = useParams();
    const [userData, setUserData] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [formData, setFormData] = useState({
        name: "Ram Tamang",
        address: "Dharan",
        description: 'Cardiologist',
        signature: '',
        total_amount: '',
        transaction_uuid: selectedDateTime,
        product_code: 'EPAYTEST',
        success_url: 'https://esewa.com.np', // success URL
        failure_url: 'https://google.com', // failure URL
        signed_field_names: 'total_amount,transaction_uuid,product_code'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/doctorDetailbyId', { _id: doctorid });
                setUserData(response.data);
                console.log(response.data.price)
                setFormData(prevState => ({
                    ...prevState,
                    total_amount: response.data.price,
                }));
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };

        fetchData();
    }, [doctorid]);

    console.log(userData)

    // Function to handle form submission
    const handleBookAppointment = async () => {
        try {
            // Generate the signature
            const secret = "8gBm/:&EnhH.1/q";
            const hash = CryptoJS.HmacSHA256(
                `total_amount =${formData.total_amount},transaction_uuid=${formData.transaction_uuid},product_code=${formData.product_code}`,
                secret
            );
            const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

            // Set the signature in the form state
            setFormData(prevState => ({
                ...prevState,
                signature: hashInBase64
            }));

            console.log(formData);

            // Submit the form
            await axios.post('http://localhost:3001/esewapay', formData);
        } catch (error) {
            console.error('Error submitting payment:', error);
        }
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {userData ? (
                        <Card style={{ marginTop: '6rem' }}>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    style={{ width: '500px', height: '280px', borderRadius: '5px', marginTop: '1rem' }}
                                    image={`http://localhost:3001/${userData.image}`}
                                    alt={userData.name}
                                />
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>Dr. {userData.name}</span>
                                </Typography>
                                {/* Display other details of the doctor */}
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box component={Paper} style={{ marginTop: '6rem' }}>
                        <CardContent>
                            <form>
                                {/* Your existing patient details form fields */}
                                <TextField
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={formData.name}
                                    onChange={e => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
                                />
                                <TextField
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    sx={{ marginBottom: '1rem' }}
                                    value={formData.address}
                                    onChange={e => setFormData(prevState => ({ ...prevState, address: e.target.value }))}
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ marginBottom: '1rem' }}
                                    value={formData.description}
                                    onChange={e => setFormData(prevState => ({ ...prevState, description: e.target.value }))}
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

                                {/* Button to trigger payment */}
                                <Button
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
                                    Pay with eSewa
                                </Button>
                            </form>
                        </CardContent>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BookAppointment;













