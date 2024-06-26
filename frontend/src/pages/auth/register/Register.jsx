import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Register = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', { name, email, password })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    alert('User registered successfully.'); 
                   
                    navigate('/login');

                } else {
                    alert('User registration failed. Please try again.');
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred while registering the user.');
                }
            });
    };



    return (

        <Box
            sx={{

                alignItems: "center",
                display: "flex",
                height: "100vh",
                justifyContent: "center",

            }}
        >
            <Grid container >
                <CssBaseline />

                <Grid
                    item
                    xs={10}
                    sm={10}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    borderRadius={4}

                    sx={{
                        maxWidth: "1200px",
                        width: "100%",
                        margin: "auto",
                        paddingY: "1rem",
                        paddingX: "0.5rem",
                    }}
                >
                    <Box
                        sx={{
                            my: 5,
                            mx: 5,

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",



                        }}
                    >
                        <Typography component="h1" variant="h5" >
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}



                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => { setEmail(e.target.value); }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => { setPassword(e.target.value); }}

                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"

                                sx={{
                                    mt: 3, mb: 2, background: '#357a38', "&:hover": {
                                        backgroundColor: '#357a38'
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Box
                            sx={{
                                color: "black",
                                marginTop: "1.5rem",
                                textAlign: "start",
                            }}
                        >
                            I have an account?{" "}
                            <Link
                                href="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "#448aff",
                                }}
                            >
                                {" "}
                                Log in
                            </Link>
                        </Box>

                    </Box>
                    
                </Grid>
            </Grid>
        </Box>

    );
}

export default Register