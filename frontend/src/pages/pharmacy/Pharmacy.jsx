
// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Grid, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import NavProfile from '../../navbar/NavProfile';
// import Footer from '../../footer/Footer';
// import { useNavigate } from "react-router-dom";


// const Pharmacy = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [products, setProducts] = useState([]);


//     const location = useLocation();
//     const email = location.state && location.state.email;
//     const navigate = useNavigate();


//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

   
//     useEffect(() => {
//         axios.get('http://localhost:3001/productDetails')
//             .then(response => {
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error);
//             });
//     }, []);

//     const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
//         product.categories.toLowerCase().includes(searchTerm.trim().toLowerCase())
//     );

//     const handleSingleProduct = (productid) => {
//         console.log(productid);
//         navigate(`/singleproduct/${productid}`);
//     }

//     return (
//         <>
//             <NavProfile email={email} />
//             <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem', height: '20vh' }}>
//                 Products
//             </Typography>
//             <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <TextField
//                     label="Search Products"
//                     variant="outlined"
//                     onChange={handleSearchChange}
//                     fullWidth
//                     style={{ paddingBottom: '0.5rem', width: '20%' }}
//                 />
//             </Box>
//             <Grid container spacing={2}>
//                 {filteredProducts.map((product, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <div style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
//                             <Card>
//                                 <CardMedia
//                                     component="img"
//                                     height="250"
//                                     image={`http://localhost:3001/${product.image}`}
//                                     alt={product.name}
//                                 />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div" style={{ paddingLeft: '4rem' }}>
//                                         Name: {product.name}
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
//                                         Categories: {product.categories}
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
//                                         Price: {product.price}
//                                     </Typography>
//                                 </CardContent>
//                                 <Box style={{ display: 'flex', justifyContent: 'center' }}>

//                                         <Button
//                                             size="small"
//                                             onClick={() => handleSingleProduct(product._id)}
//                                             style={{
//                                                 backgroundColor: 'green',
//                                                 marginBottom: '1rem',
//                                                 color: 'white',
//                                                 '&:hover': {
//                                                     backgroundColor: 'darkgreen',
//                                                 },
//                                             }}
//                                         >
//                                             See Product
//                                         </Button>
//                                 </Box>
//                             </Card>
//                         </div>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Footer />
//         </>
//     );
// }

// export default Pharmacy;






















import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavProfile from '../../navbar/NavProfile';
import Footer from '../../footer/Footer';
import { useNavigate } from "react-router-dom";


const Pharmacy = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    // const [productID, setProductID] = useState(null);

    const location = useLocation();
    const email = location.state && location.state.email;
    const navigate = useNavigate();


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // const handleSeeProduct= (productId) => {
    //     // Logic for handling the booking appointment
    //     console.log('product for product ID:', productId);
    // };

    useEffect(() => {
        axios.get('http://localhost:3001/productDetails')
            .then(response => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        product.categories.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const handleSingleProduct = (productid) => {
        console.log(productid);
        navigate(`/singleproduct/${productid}`);
    }

    return (
        <>
            <NavProfile email={email} />
            <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', paddingTop: '4rem', height: '20vh' }}>
                Products
            </Typography>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    onChange={handleSearchChange}
                    fullWidth
                    style={{ paddingBottom: '0.5rem', width: '20%' }}
                />
            </Box>
            <Grid container spacing={2}>
                {filteredProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <div style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`http://localhost:3001/${product.image}`}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" style={{ paddingLeft: '4rem' }}>
                                        Name: {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
                                        Categories: {product.categories}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{ paddingLeft: '4rem' }}>
                                        Price: {product.price}
                                    </Typography>
                                </CardContent>
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>

                                        <Button
                                            size="small"
                                            onClick={() => handleSingleProduct(product._id)}
                                            style={{
                                                backgroundColor: 'green',
                                                marginBottom: '1rem',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'darkgreen',
                                                },
                                            }}
                                        >
                                            See Product
                                        </Button>
                                </Box>
                            </Card>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </>
    );
}

export default Pharmacy;



