// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         fetchCartItems();
//     }, []);

//     const fetchCartItems = async () => {
//         try {
//             const response = await axios.get('API_ENDPOINT'); // Replace 'API_ENDPOINT' with your API URL
//             setCartItems(response.data.cartItems);
//         } catch (error) {
//             console.error('Error fetching cart items:', error);
//         }
//     };

//     const handleDeleteCartItem = async (cartItemId) => {
//         try {
//             await axios.delete(`API_ENDPOINT/${cartItemId}`); // Replace 'API_ENDPOINT' with your API URL
//             fetchCartItems();
//             alert('Deleted cart item successfully');
//         } catch (error) {
//             console.error('Error deleting cart item:', error);
//         }
//     };

//     const totalCartPrice = cartItems.reduce((total, item) => {
//         return total + item.product.price * item.quantity;
//     }, 0);

//     // Similar calculations for delivery charges, taxes, and final price

//     return (
//         <Box>
//             {/* Render cart items */}
//             {cartItems.map((item) => (
//                 <Box key={item.id}>
//                     <img src={item.product.image} alt={item.product.name} />
//                     <Typography>{item.product.name}</Typography>
//                     {/* Render other details like description, price, quantity */}
//                     <Button onClick={() => handleDeleteCartItem(item.id)}>Delete</Button>
//                 </Box>
//             ))}

//             {/* Render total cart price, taxes, delivery charges, and final price */}
//             <Typography>Total Cart Price: {totalCartPrice}</Typography>

//             {/* Render checkout button */}
//             <Button onClick={() => navigate('/checkout')}>Checkout</Button>
//         </Box>
//     );
// };

// export default Cart;







// import React from 'react';
// import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
// import { MdDelete } from 'react-icons/md';
// import NavProfile from '../../navbar/NavProfile';
// import { useLocation } from 'react-router-dom';
// import Footer from '../../footer/Footer';
// import { useNavigate } from "react-router-dom";




// const Cart = () => {


//     const location = useLocation();
//     const email = location.state && location.state.email;
//     const navigate = useNavigate();

//     // Dummy data for demonstration
//     const cartItems = [
//         {
//             id: 1,
//             product: {
//                 name: 'Product 1',
//                 image: 'https://via.placeholder.com/150',
//                 price: 10,
//             },
//             quantity: 2,
//         },
//         {
//             id: 2,
//             product: {
//                 name: 'Product 2',
//                 image: 'https://via.placeholder.com/150',
//                 price: 20,
//             },
//             quantity: 1,
//         },
//     ];

//     const totalCartPrice = cartItems.reduce((total, item) => {
//         return total + item.product.price * item.quantity;
//     }, 0);

//     return (
//         <>
//         <NavProfile email={email} />
//         <Box p={3}>

//         <Typography variant="h4" style={{
//                     display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem',
//                     height: '20vh'
//                 }}>
//                    Shopping Cart
//                 </Typography>

//             {cartItems.map((item) => (
//                 <Paper key={item.id} elevation={3} sx={{ marginBottom: 2 }}>
//                     <Grid container alignItems="center">
//                         <Grid item xs={4} md={2}>
//                             <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: 'auto' }} />
//                         </Grid>
//                         <Grid item xs={8} md={6} sx={{ textAlign: 'left', paddingLeft: 2 }}>
//                             <Typography variant="h6">{item.product.name}</Typography>
//                             <Typography variant="body1">Quantity: {item.quantity}</Typography>
//                             <Typography variant="body1">Price: Rs {item.product.price}</Typography>
//                         </Grid>
//                         <Grid item xs={6} md={2} sx={{ textAlign: 'right' }}>
//                             <IconButton color="error">
//                                 <MdDelete />
//                             </IconButton>
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             ))}

//             <Box sx={{ textAlign: 'right', marginTop: 3 }}>
//                 <Typography variant="h6">Total: Rs {totalCartPrice}</Typography>
//                 <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
//                     Proceed to Checkout
//                 </Button>
//             </Box>
//         </Box>
//         <Footer />

//         </>
//     );
// };

// export default Cart;
















// import React from 'react';
// import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
// import { MdDelete } from 'react-icons/md';
// import { useCart } from './CartContext';

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();
//   console.log(cartItems)

//   const totalCartPrice = cartItems.reduce((total, item) => {
//     return total + item.product.price * item.quantity;
//   }, 0);

//   return (
//     <>
//       <Box p={3}>
//         <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem', height: '20vh' }}>
//           Shopping Cart
//         </Typography>
//         {cartItems.map((item) => (
//           <Paper key={item.id} elevation={3} sx={{ marginBottom: 2 }}>
//             <Grid container alignItems="center">
//               <Grid item xs={4} md={2}>
//                 <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: 'auto' }} />
//               </Grid>
//               <Grid item xs={8} md={6} sx={{ textAlign: 'left', paddingLeft: 2 }}>
//                 <Typography variant="h6">{item.product.name}</Typography>
//                 <Typography variant="body1">Quantity: {item.quantity}</Typography>
//                 <Typography variant="body1">Price: Rs {item.product.price}</Typography>
//               </Grid>
//               <Grid item xs={6} md={2} sx={{ textAlign: 'right' }}>
//                 <IconButton color="error" onClick={() => removeFromCart(item.id)}>
//                   <MdDelete />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Paper>
//         ))}
//         <Box sx={{ textAlign: 'right', marginTop: 3 }}>
//           <Typography variant="h6">Total: Rs {totalCartPrice}</Typography>
//           <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
//             Proceed to Checkout
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
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
                                <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: 'auto' }} />
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
