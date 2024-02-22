import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'green', // Change gray to green
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              HospitalInventory dedicated to providing the best service to our
              patients.
            </Typography>
          </Grid>
         
          <Grid item xs={12} sm={6}  sx={{ textAlign: {  sm: 'left' }, }} >
            {/* <Box sx={{ paddingLeft: '25rem' }}> */}
          <Typography variant="h6" color="white" gutterBottom style={{paddingRight:'6rem'}}>
              Contact Us
            </Typography>
            
            <Typography variant="body2" color="white" >
              Email: HospitalInventory@gmail.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: 9827124489
            </Typography>
            {/* </Box> */}
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © "}
            
              HospitalInventory
            
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

