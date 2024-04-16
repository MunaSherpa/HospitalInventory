import React, { useState } from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    TextField,
    Container,
    Button
} from '@mui/material';
import Paper from "@mui/material/Paper";
import EsewaLogo from '../../assets/esewalogo.png';
// import KhaltiLogo from '../../assets/khaltilogo.svg';

const CheckOut = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box component={Paper} style={{ marginTop: '6rem' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>Customer Details</span>
                                </Typography>
                            </div>
                            <form>
                                <TextField
                                    name="name"
                                    label="Your Name"
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                                <TextField
                                    name="email"
                                    label="Your Email"
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                                <TextField
                                    name="address"
                                    label="Your Address"
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                            </form>
                        </CardContent>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card style={{ marginTop: '6rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                <span style={{ color: 'black', fontWeight: 'bold' }}>Checkout</span>
                            </Typography>
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}> Product Name: Acetaminophen </span> 
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}>Price: </span> Rs. 1000
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}>Total Price: </span> Rs. 1000
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}>Payment Option: </span>
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <input
                                        type="radio"
                                        id="esewa"
                                        name="paymentMethod"
                                        value="esewa"
                                        checked={paymentMethod === 'esewa'}
                                        onChange={() => handlePaymentMethodChange('esewa')}
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
                                        onChange={() => handlePaymentMethodChange('khalti')}
                                    />
                                    <img style={{ width: "40%" }} className='profile' alt='profilepicture' src={KhaltiLogo} />
                                </div> */}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    class="btn"
                                    size="small"
                                    style={{
                                        backgroundColor: 'green',
                                        marginTop: '1rem',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'darkgreen',
                                        },
                                    }}
                                >
                                    Check Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckOut;
