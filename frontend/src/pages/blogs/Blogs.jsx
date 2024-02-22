import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Box } from '@mui/material';
import blog1 from "../../assets/blog1.png"
import blog2 from "../../assets/blog2.png"
import Navbar from '../../navbar/Navbar';
import Footer from '../../footer/Footer';

const Blogs = () => {
  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: 20, 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Blog - Let's Talk Health
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <img src={blog1} alt="Blog Image" style={{ width: '100%', height: 'auto' }} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  What is Mental Health? Symptom and Treatment
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  June 08, 2023
                </Typography>
                <Typography variant="body1" paragraph>
                  Mental health is all about your emotional, psychological and social well-being. It is how we feel, think and act. I would say “Mental health is your asset.” - Sneha A. Chaudhary (One of the Best Psychiatrists in Kathmandu).
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>  
          </Grid>
        </Grid>
        <Box mt={4} />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', }}>
              <img src={blog2} alt="Blog Image" style={{ width: '100%', height: 'auto' }} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  What is Mental Health? Symptom and Treatment
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  June 08, 2023
                </Typography>
                <Typography variant="body1" paragraph>
                  Mental health is all about your emotional, psychological and social well-being. It is how we feel, think and act. I would say “Mental health is your asset.” - Sneha A. Chaudhary (One of the Best Psychiatrists in Kathmandu).
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>       
          </Grid>
        </Grid>
      </Container>
      <Box mt={4} />
      <Footer />
    </>
  );
};

export default Blogs;
