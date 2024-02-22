import React, { useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { Typography, Box, Grid, Card, CardContent, Button, CardActions, CardMedia, TextField } from '@mui/material'
import med1 from '../../assets/med1.png'
import med2 from '../../assets/med2.png'
import med3 from '../../assets/med3.png'
import med4 from '../../assets/med4.png'
import Footer from '../../footer/Footer'
import med from '../../assets/med.png'


const Pharmacy = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const Medicines = [
        {
            name: "Acetamlnophen",
            price: "Rs 100",
            imageUrl: med1,
        },
        {
            name: "Centozone Tablete",
            price: "Rs 200",
            imageUrl: med2,
        },
        {
            name: "Acetamlnophen",
            price: "Rs 100",
            imageUrl: med3,
        },
        {
            name: "Centozone Tablete",
            Price: "Rs 200",
            imageUrl: med4,
        },
        {
            name: "Acetamlnophen",
            price: "Rs 100",
            imageUrl: med2,
        },
        {
            name: "Centozone Tablete",
            price: "Rs 200",
            imageUrl: med3,
        },
        {
            name: "Acetamlnophen",
            price: "Rs 100",
            imageUrl: med1,
        },
        {
            name: "Centozone Tablete",
            price: "Rs 200",
            imageUrl: med2,
        },
        {
            name: "Acetamlnophen",
            price: "Rs 100",
            imageUrl: med3,
        },
    ];
    const filteredMedicines = Medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.trim().toLowerCase())

    );

    return (
        <>
            <Navbar />
            <Box>
                <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={med}
                        alt="Medical Service"
                        style={{
                            width: '100%',
                            maxHeight: '600px',
                            objectFit: 'cover',
                            marginTop: '2rem'
                        }}
                    />
                </Box>


                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        label="Search Medicines"
                        variant="outlined"
                        onChange={handleSearchChange}
                        fullWidth
                        style={{ paddingBottom: '0.5rem ', width: '20%', }}
                    />
                </Box>


                <Grid container spacing={2}>
                    {filteredMedicines.map((medicine, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <div style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={medicine.imageUrl}
                                        alt={medicine.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" style={{ paddingLeft: '4rem' }}>
                                            {medicine.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
                                            {medicine.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{ justifyContent: 'center' }}>  {/* Centering the CardActions */}
                                        <Button
                                            size="small"
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white'
                                            }}
                                        >
                                            Add to Cart
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

export default Pharmacy