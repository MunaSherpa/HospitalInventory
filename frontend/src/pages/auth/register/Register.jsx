import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import doctorImg from "../../../assets/doctor.png"
import { green } from "@mui/material/colors";
import { InputBase } from '@mui/material';

export default function SignInSide() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
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
                            Sign Up
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            //   InputLabelProps={{sx:{ "&.Mui-focused": {color: '#357a38',}}}}


                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus


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
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
}