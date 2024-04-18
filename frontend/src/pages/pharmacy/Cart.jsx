

// import React from 'react';
// import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
// import { MdDelete } from 'react-icons/md';
// import { useCart } from './CartContext';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//     const { cartItems, removeFromCart } = useCart();
//     const navigate = useNavigate(); // Initialize the navigate function

//     const totalCartPrice = cartItems.reduce((total, item) => {
//         return total + item.product.price * item.quantity;
//     }, 0);

    

//     return (
//         <>
//             <Box p={3}>
//                 <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem', height: '20vh' }}>
//                     Shopping Cart
//                 </Typography>
//                 {cartItems.map((item) => (
//                     <Paper key={item.id} elevation={3} sx={{ marginBottom: 2 }}>
//                         <Grid container alignItems="center">
//                             <Grid item xs={4} md={2}>
//                                 <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: 'auto' }} />
//                             </Grid>
//                             <Grid item xs={8} md={6} sx={{ textAlign: 'left', paddingLeft: 2 }}>
//                                 <Typography variant="h6">{item.product.name}</Typography>
//                                 <Typography variant="body1">Quantity: {item.quantity}</Typography>
//                                 <Typography variant="body1">Price: Rs {item.product.price}</Typography>
//                             </Grid>
//                             <Grid item xs={6} md={2} sx={{ textAlign: 'right' }}>
//                                 <IconButton color="error" onClick={() => removeFromCart(item.id)}>
//                                     <MdDelete />
//                                 </IconButton>
//                             </Grid>
//                         </Grid>
//                     </Paper>
//                 ))}
//                 <Box sx={{ textAlign: 'right', marginTop: 3 }}>
//                     <Typography variant="h6">Total: Rs {totalCartPrice}</Typography>
                    
//                     <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => navigate('/checkout', { cartItems })}>
//                         Proceed to Checkout
//                     </Button>

//                 </Box>
//             </Box>
//         </>
//     );
// };

// export default Cart;




















import React from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate(); // Initialize the navigate function

    const totalCartPrice = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    //   const handleProceedToCheckout = () => {
    //     // Navigate to the checkout page
    //     navigate('/checkout');
    //   };

    return (
        <>
            <Box p={3}>
                <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem', height: '20vh' }}>
                    Shopping Cart
                </Typography>
                {cartItems.map((item) => (
                    <Paper key={item.id} elevation={3} sx={{ marginBottom: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={4} md={2}>
                                <img src={`http://localhost:3001/${item.product.image}`} alt={item.product.name} style={{ width: '100%', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={8} md={6} sx={{ textAlign: 'left', paddingLeft: 2 }}>
                                <Typography variant="h6">{item.product.name}</Typography>
                                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                                <Typography variant="body1">Price: Rs {item.product.price}</Typography>
                            </Grid>
                            <Grid item xs={6} md={2} sx={{ textAlign: 'right' }}>
                                <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                    <MdDelete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Box sx={{ textAlign: 'right', marginTop: 3 }}>
                    <Typography variant="h6">Total: Rs {totalCartPrice}</Typography>
                    {/* <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button> */}
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => navigate('/checkout', { cartItems })}>
                        Proceed to Checkout
                    </Button>

                </Box>
            </Box>
        </>
    );
};

export default Cart;
