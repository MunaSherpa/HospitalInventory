import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams} from "react-router-dom"
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


const ResetPassword = () => {
    
    const [password, setPassword]= useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3001/resetPassword/${id}/${token}`, { password})
        .then(res=> {
          if (res.data.Status === "Password Changed Successfully") {
           
              navigate('/login')

          }
      })
        .catch(err=> console.log(err))
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
                                  Reset Password
                              </Typography>
                              <form onSubmit={handleSubmit}>
                                  
                              <TextField
                                      margin="normal"
                                      required
                                      fullWidth
                                      name="password"
                                      label="New Password"
                                      type="password"
                                      id="password"
                                      autoComplete="off"
                                      onChange={(e)=> {setPassword(e.target.value);}}
      
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
                                      Update
                                  </Button>
                                  </form>
                                  
                                  
      
                              </Box>
                          
                      </Grid>
                  </Grid>
              </Box>
      
          );
}

export default ResetPassword