import React from 'react'
import Nav from '../Nav';
import Sidenav from '../Sidenav';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';



const AdminDashboard = () => {
  return (
    <>
      <Nav />
      <Box height={30} />
      <Sidenav />
      <h1> Admin Dashboard </h1>
    </>
  )
}

export default AdminDashboard