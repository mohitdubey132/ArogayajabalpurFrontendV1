import React, { Suspense, useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import { Update } from '../dbFatch';
import { ToastContainer, toast } from 'react-toastify';
export default function DoctorsTable({ doctors, updateDoctors}) {
  console.log(doctors)
  async function approval(id) {
    const path = `/api/v1/admin/doctor/${id}`;
    const data = {
      applicationStatus: "approved"
    }
    const response = await Update(path, data);
    if (response.success === true) {
      toast("Doctor get approval successfully", { position: "top-center" })
      updateDoctors(id,response);
      
    }
  }
  async function blockDoctor(id) {
    const path = `/api/v1/admin/doctor/${id}`;
    const data = {
      "applicationStatus": "blocked"
    }
    const response = await Update(path, data);
    if (response.success === true) {
      toast("Doctor get Blocked successfully", { position: "top-center" })
      updateDoctors(id,response);
    }
  }
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <center>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "black", color: "lightblue" }}>
                <TableCell style={{ color: "lightblue" }}>Doctor Name</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Number</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Registeration Number</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Email Id</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Specialization</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Application Status</TableCell>
                <TableCell style={{ color: "lightblue" }} align='right'>Options</TableCell>
              </TableRow>
            </TableHead>
            <Suspense fallback={<HashLoader color="#d65c36" />}>
              <TableBody>
                {doctors.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                        <img src={row.images.url} height={"250px"} width={"250px"} />
                        <h3>{row.name}</h3>
                      </div>

                    </TableCell>
                    <TableCell align="right">{row.number}</TableCell>
                    <TableCell align="right">{row.registerationNumber}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.specialization}</TableCell>
                    <TableCell align='right'>{row.applicationStatus} </TableCell>
                    <TableCell align='right' ><Button variant='success' onClick={() => approval(row._id)}>Approved</Button> <Button variant="dark" onClick={() => blockDoctor(row._id)}>Block</Button> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Suspense>
          </Table>
        </TableContainer>
      </center>
      <ToastContainer/>
    </div>);
}