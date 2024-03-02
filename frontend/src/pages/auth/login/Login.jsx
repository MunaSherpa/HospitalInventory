import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
import Slide from '@mui/material/Slide';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [successState, setSuccessState] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSuccessState(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                console.log(result.data.message);

                if (result.data.message === "LogIn Success") {
                    alert(result.data.message);
                    setSuccessState(true);
                    // navigate('/');
                    navigate('/homepage', { state: { email: email } }); // Passing email as state
               
                // }
                } else {
                    // navigate('/');
                    alert(result.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert("Invalid Email or Password.");
                } else {
                    console.error("An error occurred:", error);
                }
            });
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                height: "100vh",
                justifyContent: "center",
            }}
        >
            <Grid container>
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
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
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
                                Login
                            </Button>
                            <Snackbar open={successState} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                                TransitionComponent={Slide}
                                transitionDuration={100}
                            >
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Registration Success
                                </Alert>
                            </Snackbar>
                        </form>
                        <Box
                            sx={{
                                color: "black",
                                textAlign: "start",
                            }}
                        >
                            <Link
                                href="/forgotPassword"
                                style={{
                                    textDecoration: "none",
                                    color: "#448aff",
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                color: "black",
                                textAlign: "start",
                            }}
                        >
                            Not registered yet?{" "}
                            <Link
                                href="/register"
                                style={{
                                    textDecoration: "none",
                                    color: "#448aff",
                                }}
                            >
                                Register
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;