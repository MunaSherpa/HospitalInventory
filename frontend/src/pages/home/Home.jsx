import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, Button, CardActions, CardMedia } from '@mui/material';
import img from '../../assets/img.png';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import Footer from '../../footer/Footer';
import NavProfile from '../../navbar/NavProfile';
// import Chats from '../chat/Chats';
import Chats from '../../pages/chat/Chats';


const Home = () => {
    const location = useLocation();
    const email = location.state && location.state.email;
    console.log(email);

    const services = [
        {
            name: "Neurology",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
        {
            name: "Mental Health",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
        {
            name: "Hear & Vascular",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
        {
            name: "Neurology",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
        {
            name: "Mental Health",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
        {
            name: "Hear & Vascular",
            description: "World-class care for everyone. our health system offers unmatched expert healthcare from the lab to the clinic.",
        },
    ];

    const doctors = [
        {
            name: "Dr. Kaman Limbu",
            specialist: "Cardiologist",
            imageUrl: img1,
        },
        {
            name: "Dr. Sarina Rai",
            specialist: "Surgon",
            imageUrl: img2,
        },
        {
            name: "Dr. Soniya Rai",
            specialist: "dermatologist",
            imageUrl: img3,
        },
        {
            name: "Dr. Alfaz Limbu",
            specialist: "Pulmonologists",
            imageUrl: img1,
        },
        {
            name: "Dr. Suman Tamang",
            specialist: "Urologists",
            imageUrl: img2,
        },
        {
            name: "Dr. Rabina Limbu",
            specialist: "Nephrologists",
            imageUrl: img3,
        },
        {
            name: "Dr. Rabin Karki",
            specialist: "Ophthalmologists",
            imageUrl: img1,
        },
        {
            name: "Dr. Rubina Tamang",
            specialist: "Endocrinologists.",
            imageUrl: img2,
        },
        {
            name: "Dr. Samita Limbu",
            specialist: "Gastroenterologists",
            imageUrl: img3,
        },
    ];

    return (
        <>
        <NavProfile email={email} />
            
            <Box>
                <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={img}
                        alt="Medical Service"
                        style={{
                            width: '100%',
                            maxHeight: '600px',
                            objectFit: 'cover',
                            // marginTop: '2rem'
                        }}
                    />
                </Box>
                {/* {email && (
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                        Logged in as: {email}
                    </Typography>
                )} */}
                <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    Our Medical Service
                </Typography>
                <Grid container spacing={3}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={4} key={index} >
                            <Box style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {service.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    Our Doctors
                </Typography>
                <Grid container spacing={2}>
                    {doctors.map((doctor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <div style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={doctor.imageUrl}
                                        alt={doctor.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" style={{ paddingLeft: '4rem' }}>
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
                                            {doctor.specialist}
                                        </Typography>
                                    </CardContent>
                                    <Box style={{display: 'flex', justifyContent: 'center'}}>
                                    {/* <CardActions> */}
                                        
                                        <Button
                                            size="small"
                                            style={{
                                                backgroundColor: 'green',
                                                // textAlign:'center',
                                                // marginLeft: '5rem',
                                                marginBottom:'1rem',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'darkgreen',
                                                },
                                            }}
                                        >
                                            Book Appointment
                                        </Button>
                                    {/* </CardActions> */}
                                    </Box>
                                </Card>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Chats/>

            <Footer />
        </>
    );
}

export default Home;