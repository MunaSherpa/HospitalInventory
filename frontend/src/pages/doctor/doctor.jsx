import React, { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { Typography, Box, Grid, Card, CardContent, Button, CardActions, CardMedia, TextField } from '@mui/material';
import Footer from '../../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavProfile from '../../navbar/navprofile';

const Doctor = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const location = useLocation();
    const email = location.state && location.state.email;
    console.log(doctors)
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/doctorDetails')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctor details:', error);
            });
    }, []);

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        doctor.specialist.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    console.log(filteredDoctors)
    return (
        <>
            <NavProfile email={email} />
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
                                        image={`http://localhost:3001/${doctor.image}`}
                                        alt={doctor.name}
                                    />
                                    {console.log(doctor.image)}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" style={{ paddingLeft: '4rem' }}>
                                            Dr. {doctor.name}
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
            <Footer />
        </>
    )
}

export default Doctor;
