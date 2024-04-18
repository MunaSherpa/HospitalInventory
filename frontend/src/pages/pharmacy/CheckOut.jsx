// import React, { useState } from 'react';
// import {
//     Typography,
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     TextField,
//     Container,
//     Button
// } from '@mui/material';
// import Paper from "@mui/material/Paper";
// import EsewaLogo from '../../assets/esewalogo.png';
// // import KhaltiLogo from '../../assets/khaltilogo.svg';

// const CheckOut = () => {
//     const [paymentMethod, setPaymentMethod] = useState('');

//     const handlePaymentMethodChange = (method) => {
//         setPaymentMethod(method);
//     };

//     return (
//         <Container>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     <Box component={Paper} style={{ marginTop: '6rem' }}>
//                         <CardContent>
//                             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     <span style={{ color: 'black', fontWeight: 'bold' }}>Customer Details</span>
//                                 </Typography>
//                             </div>
//                             <form>
//                                 <TextField
//                                     name="name"
//                                     label="Your Name"
//                                     fullWidth
//                                     sx={{ marginBottom: '2.2rem' }}
//                                 />
//                                 <TextField
//                                     name="email"
//                                     label="Your Email"
//                                     fullWidth
//                                     sx={{ marginBottom: '2.2rem' }}
//                                 />
//                                 <TextField
//                                     name="address"
//                                     label="Your Address"
//                                     fullWidth
//                                     sx={{ marginBottom: '2.2rem' }}
//                                 />
//                             </form>
//                         </CardContent>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card style={{ marginTop: '6rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'center' }}>
//                             <Typography gutterBottom variant="h5" component="div">
//                                 <span style={{ color: 'black', fontWeight: 'bold' }}>Checkout</span>
//                             </Typography>
//                         </div>
//                         <CardContent>
//                             <Typography gutterBottom variant="h6" component="div">
//                                 <span style={{ color: 'black' }}> Product Name: Acetaminophen </span> 
//                             </Typography>
//                             <Typography gutterBottom variant="h6" component="div">
//                                 <span style={{ color: 'black' }}>Price: </span> Rs. 1000
//                             </Typography>
//                             <Typography gutterBottom variant="h6" component="div">
//                                 <span style={{ color: 'black' }}>Total Price: </span> Rs. 1000
//                             </Typography>
//                             <Typography gutterBottom variant="h6" component="div">
//                                 <span style={{ color: 'black' }}>Payment Option: </span>
//                             </Typography>
//                             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <div>
//                                     <input
//                                         type="radio"
//                                         id="esewa"
//                                         name="paymentMethod"
//                                         value="esewa"
//                                         checked={paymentMethod === 'esewa'}
//                                         onChange={() => handlePaymentMethodChange('esewa')}
//                                     />
//                                     <img style={{ width: "10%" }} className='profile' alt='profilepicture' src={EsewaLogo} />
//                                 </div>
//                                 {/* <div>
//                                     <input
//                                         type="radio"
//                                         id="khalti"
//                                         name="paymentMethod"
//                                         value="khalti"
//                                         checked={paymentMethod === 'khalti'}
//                                         onChange={() => handlePaymentMethodChange('khalti')}
//                                     />
//                                     <img style={{ width: "40%" }} className='profile' alt='profilepicture' src={KhaltiLogo} />
//                                 </div> */}
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                 <Button
//                                     class="btn"
//                                     size="small"
//                                     style={{
//                                         backgroundColor: 'green',
//                                         marginTop: '1rem',
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: 'darkgreen',
//                                         },
//                                     }}
//                                 >
//                                     Check Out
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default CheckOut;























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
import { useCart } from './CartContext';

const CheckOut = () => {
    const { cartItems } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

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
                                <label><b>Full Name</b></label>
                                <TextField
                                    name="name"
                                    placeholder='eg: Muna Sherpa'
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                                <label><b>Phone Number</b></label>
                                 <TextField
                                    name="phoneNumber"
                                    placeholder='eg: 984782145'
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                                <label><b>Email Address</b></label>
                                <TextField
                                    name="email"
                                    placeholder='eg: muna@gmail.com'
                                    fullWidth
                                    sx={{ marginBottom: '2.2rem' }}
                                />
                                <label><b>Address</b></label>
                                <TextField
                                    name="address"
                                    placeholder='eg: Sangeet Chowk, Itahari'
                                
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
                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        <span style={{ color: 'black' }}><b>Product Name:</b> {item.product.name}</span>
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        <span style={{ color: 'black' }}><b>Price: Rs.</b> {item.product.price * item.quantity}</span>
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        <span style={{ color: 'black' }}><b>Quantity:</b> {item.quantity}</span>
                                    </Typography>
                                </div>
                            ))}
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}><b>Total Price:</b> Rs. {totalPrice}</span>
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <span style={{ color: 'black' }}><b>Payment Option:</b> </span>
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

