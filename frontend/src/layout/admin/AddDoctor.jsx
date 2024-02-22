import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import Sidenav from './Sidenav';
import Nav from './Nav';

const AddDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    image: '',
    name: '',
    specialist: '',
    workExperience: '',
    education: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDoctorInfo(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Doctor Information:', doctorInfo);
    setDoctorInfo({
      image: '',
      name: '',
      specialist: '',
      workExperience: '',
      education: '',
    
    });
  };

  return (
    <>
    <Nav/>
    <Box height={30}/>
    <Sidenav/>
    <Container>
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Doctor
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSubmit}>
          <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" sx={{ bgcolor: 'gray', '&:hover': { bgcolor: 'gray' } }}>
                Choose Image File
              </Button>
            </label>
            <TextField
              fullWidth
              margin="normal"
              required
              name="name"
              label="Doctor Name"
              value={doctorInfo.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              name="specialist"
              label="Specialist"
              value={doctorInfo.specialist}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              name="workExperience"
              label="Work Experience"
              value={doctorInfo.workExperience}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              name="education"
              label="Education"
              value={doctorInfo.education}
              onChange={handleChange}
            />
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={handleImageChange}
            />
            
            <Box mt={2} textAlign="center">
              <Button variant="contained" color="primary" sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }} type="submit">
                Add Doctor
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default AddDoctor;
