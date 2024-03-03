import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import Sidenav from './Sidenav';
import Nav from './Nav';

const AddDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    image: '',
    name: '',
    email: '',
    specialist: '',
    workExperience: '',
    education: '',
    price: '',
    time: ''
  });
  const [imageData, setImageData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageData(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setDoctorInfo(prevState => ({
        ...prevState,
        image: reader.result // Save the image data URL
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(doctorInfo)
    try {
      const formData = new FormData();
      formData.append('image', imageData); // Append image data URL
      formData.append('name', doctorInfo.name);
      formData.append('email', doctorInfo.email);
      formData.append('specialist', doctorInfo.specialist);
      formData.append('workExperience', doctorInfo.workExperience);
      formData.append('education', doctorInfo.education);
      formData.append('price', doctorInfo.price);
      formData.append('time', doctorInfo.time);

      const response = await axios.post('http://localhost:3001/doctorRegister', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response.data);
      setDoctorInfo({
        image: '', 
        name: '',
        email: '',
        specialist: '',
        workExperience: '',
        education: '',
        price: '',
        time: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
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
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
              />
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
                name="email"
                label="Email"
                value={doctorInfo.email}
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
              <TextField
                fullWidth
                margin="normal"
                required
                name="price"
                label="Price"
                value={doctorInfo.price}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                name="time"
                label="Time"
                value={doctorInfo.time}
                onChange={handleChange}
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
