import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// import { Link } from 'react-router-dom'; 
import Sidenav from '../Sidenav';
import Nav from '../Nav';

const AddItems = () => {
    const [productInfo, setProductInfo] = useState({
      username:'',
      email:'',
        name: '',
        price: '',
        categories: '',
        quantity: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

 

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!productInfo.name || !productInfo.description || !productInfo.price || !productInfo.stock || !productInfo.categories) {
                setError('All fields are required.');
                setOpenSnackbar(true);
                return;
            }

            const formData = new FormData();
            formData.append('username', productInfo.username);
            formData.append('email', productInfo.email);

            formData.append('name', productInfo.name);

            formData.append('price', productInfo.price);
            formData.append('categories', productInfo.categories); 
            formData.append('quantity', productInfo.quantity);
        

            const response = await axios.post('http://localhost:3001/productCreated', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Product added successfully.');
            setOpenSnackbar(true);
            setProductInfo({
                username:'',
                email:'',
                name: '',
                price: '',
                categories: '',
                quantity: ''
            });
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('An error occurred while adding the product.');
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Nav />
            <Box height={30} />
            <Sidenav />
            <Container>
                <Box mt={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add Product Items
                    </Typography>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6}>
                        <form onSubmit={handleSubmit}>
                            
                        <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="user name"
                                label="User Name"
                                value={productInfo.username}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="email"
                                label="Email"
                                value={productInfo.name}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="name"
                                label="Product Name"
                                value={productInfo.name}
                                onChange={handleChange}
                            />
                            
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="price"
                                label="Price"
                                type="number"
                                value={productInfo.price}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="categories"
                                label="Categories"
                                value={productInfo.categories}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="quantity"
                                label="quantity"
                                type="number"
                                value={productInfo.quantity}
                                onChange={handleChange}
                            />
                            <Box mt={2} textAlign="center">
                                <Button variant="contained" color="primary" sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }} type="submit">
                                    Add Product Items
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                    {error || successMessage}
                </MuiAlert>
            </Snackbar>
            {/* Button to see product */}
            {/* <Box mt={4} display="flex" justifyContent="center">
                <Link to={`/product/${productInfo._id}`}>
                    <Button variant="contained" color="primary" sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}>
                        See Product
                    </Button>
                </Link>
            </Box> */}
        </>
    );
};

export default AddItems;
