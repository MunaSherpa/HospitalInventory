import React, { useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { Typography, Box, Grid, Card, CardContent, Button, CardActions, CardMedia, TextField } from '@mui/material'
import img from '../../assets/img.png'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import Footer from '../../footer/Footer'
import { Link } from 'react-router-dom';


const Doctor = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        doctor.specialist.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    return (
        <>
            <Navbar />
            <Box>

                <Typography variant="h4" style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem',
                    height: '20vh'
                }}>
                    Our Doctors
                </Typography>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        label="Search Doctors"
                        variant="outlined"
                        onChange={handleSearchChange}
                        fullWidth
                        style={{ paddingBottom: '0.5rem ', width: '20%', }}
                    />
                </Box>
                <Grid container spacing={2}>
                    {filteredDoctors.map((doctor, index) => (
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
                                    <CardActions>
                                        <Button
                                            size="small"
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                marginLeft: '4rem',

                                            }}
                                        >
                                            <Link to="/viewdoctor" style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                textDecoration: 'none'

                                            }}>View Profile</Link>
                                        </Button>
                                        <Button
                                            size="small"
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'darkgreen',
                                                },

                                            }}
                                        >
                                            Book Appointment
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            < Footer />
        </>

    )
}

export default Doctor