import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, TextField, Button, Box } from '@mui/material';

const UserProfile = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
console.log(name);
console.log(userEmail)
  useEffect(() => {
    axios.post('http://localhost:3001/userDetailsbyEmail', { email: email })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:",email, name, userEmail);
    
    // Make POST request to update user profile
    axios.post('http://localhost:3001/updateUserProfile', {
      email: email,
      name: name,
      userEmail: userEmail
    })
    .then(response => {
      console.log("Profile updated successfully:", response.data);
      alert(response.data)
    
    })
    .catch(error => {
      console.error('Error updating user profile:', error);
    
    });
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Paper elevation={3} style={{ width: '100%', padding: '20px' }}>
              <Typography variant="h5" align="center" gutterBottom>
                User Profile
              </Typography>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Name: {userData.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Email: {userData.email}
                </Typography>
              </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '25px', marginTop: '1.5rem' }}>
              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Update User Profile
                  </Typography>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    name="userEmail"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={userEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 3, mb: 1, background: '#357a38', "&:hover": {
                          backgroundColor: '#357a38'
                        },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile;
