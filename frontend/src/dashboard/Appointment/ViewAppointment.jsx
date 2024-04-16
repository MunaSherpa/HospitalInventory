import Nav from '../Nav';
import Sidenav from '../Sidenav';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography, Box, Button } from '@mui/material';
import { MdOutlineModeEdit, MdDeleteForever } from "react-icons/md";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4caf50",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState();
  const navigate = useNavigate();


  const handleEdit = (appID) => {
    navigate(`/dashboard/editappointment/${appID}`)
  }
  const handleDelete = (appID) => {
    setOpen(true);
    console.log(`AppID: ${appID}`);
    setSelectedAppointmentId(appID);
  };

  console.log(selectedAppointmentId);


  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    console.log(selectedAppointmentId);
    try {
        // Assuming selectedAppointmentId is an object like { _id: 'someId' }
        const response = await fetch('http://localhost:3001/deleteappointmentbyid', {
            method: 'DELETE', // Assuming it's a DELETE request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: selectedAppointmentId }) // Sending only the _id
        });
        const data = await response.json();
        console.log(data);
        if (data === "Appointment deleted successfully") {
            alert("Appointment Deleted");
            const updatedAppointments = appointments.filter(appointment => appointment._id !== selectedAppointmentId._id);
            setAppointments(updatedAppointments);
            setSelectedAppointmentId(null);

             // Refresh the page
        }
        window.location.reload();
        handleClose();

    } catch (error) {
        console.error('Error deleting appointment:', error);
    }
};



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/fetchappointments`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <Box height={30} />
      <Sidenav />
      <div className='outer-div' style={{ padding: '1rem', paddingLeft: '5rem' }}>
        {appointments.length === 0 ? (
          <Box justifyContent='center' sx={{ display: 'flex' }}>
            <Typography style={{ fontWeight: "bold", fontSize: "1.2rem" }} variant="h6" color="black" noWrap component="div">
              No Appointment Found
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow component="th" scope="row">
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "large" }}>Reason of Appointment</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "large" }}>Appointment Date and Time</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "large" }}>Patient Name</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "large" }}>Doctor Name</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "large" }}>Specialist</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Patient Email</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Appointment Fee</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Payment Type</StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <StyledTableRow key={appointment._id}>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.appointmentReason}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.appointmentDateAndTime}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.patientName}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.doctorName}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.specialist}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.patientEmail}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.totalAmount}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>{appointment.paymentType}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }}>
                      <IconButton style={{ color: "#4caf50" }} onClick={() => handleEdit(appointment._id)} >
                        <MdOutlineModeEdit />
                      </IconButton>
                      <IconButton style={{ color: "red" }} onClick={() => handleDelete(appointment._id)} >
                        <MdDeleteForever />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to Delete this Appointment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Your changes cannot be reverted</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirmDelete} autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
