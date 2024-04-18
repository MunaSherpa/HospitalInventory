
// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useCart } from './CartContext';

// import { useLocation } from 'react-router-dom';
// import NavProfile from '../../navbar/NavProfile';
// import Footer from '../../footer/Footer';
// import { useNavigate } from "react-router-dom";

// const SingleProduct = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();


//   const location = useLocation();
//   const email = location.state && location.state.email;
//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post('http://localhost:3001/productDetailbyId', { _id: productId });
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   const increaseQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prevQuantity => prevQuantity - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     const itemToAdd = {
//       id: productId,
//       product,
//       quantity,
//     };
//     addToCart(itemToAdd);
//   };

//   if (!product) {
//     return <Typography>{productId}</Typography>;
//   }

//   return (
//     <>
//             <NavProfile email={email} />

//       <Box sx={{ my: 16}}>
//         <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
//           <CardMedia
//             component="img"
//             height="300"
//             image={`http://localhost:3001/${product.image}`}
//             alt={product.name}
//           />
//           <CardContent>
//             <Typography variant="body1">
//               Name: {product.name}
//             </Typography>
//             <Typography variant="body1">
//               Description: {product.description}
//             </Typography>
//             <Typography variant="body1">
//               Price: {product.price}
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item>
//                 <Button variant="contained" onClick={decreaseQuantity}>-</Button>
//               </Grid>
//               <Grid item>
//                 <Typography variant="body1">
//                   {quantity}
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Button variant="contained" onClick={increaseQuantity}>+</Button>
//               </Grid>
//             </Grid>
//             <Box style={{ display: 'flex', justifyContent: 'center' }}>
//               <Button
//                 size="small"
//                 onClick={handleAddToCart}
//                 style={{
//                   backgroundColor: 'green',
//                   marginBottom: '1rem',
//                   color: 'white',
//                   '&:hover': {
//                     backgroundColor: 'darkgreen',
//                   },
//                 }}
//               >
//                 Add To Cart
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//       <Footer />

//     </>
//   );
// };

// export default SingleProduct;























import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';

import { useLocation } from 'react-router-dom';
import NavProfile from '../../navbar/NavProfile';
import Footer from '../../footer/Footer';
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();


  const location = useLocation();
  const email = location.state && location.state.email;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/productDetailbyId', { _id: productId });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [productId]);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: productId,
      product,
      quantity,
    };
    addToCart(itemToAdd);
  };

  if (!product) {
    return <Typography>{productId}</Typography>;
  }

  return (
    <>
            <NavProfile email={email} />

      <Box sx={{ my: 16}}>
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:3001/${product.image}`}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="body1">
              Name: {product.name}
            </Typography>
            <Typography variant="body1">
              Description: {product.description}
            </Typography>
            <Typography variant="body1">
              Price: {product.price}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={decreaseQuantity}>-</Button>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={increaseQuantity}>+</Button>
              </Grid>
            </Grid>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                size="small"
                onClick={handleAddToCart}
                style={{
                  backgroundColor: 'green',
                  marginBottom: '1rem',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                  },
                }}
              >
                Add To Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />

    </>
  );
};

export default SingleProduct;






















