import React , {Suspense ,useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';

export default function DoctorsTable({doctors}) {
  console.log(doctors)
  return (
    <div style={{width:"100%" , display:"flex",justifyContent:"center"}}>
    <center>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"black",color:"lightblue"}}>
            <TableCell style={{color:"lightblue"}}>Doctor Name</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Number</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Registeration Number</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Email Id</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Specialization</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Application Status</TableCell>
            <TableCell style={{color:"lightblue"}}   align='right'>Options</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.registerationNumber}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.specialization}</TableCell>
              <TableCell align='right'>{row.applicationStatus} </TableCell>
              <TableCell align='right'><Button variant='success'>Approved</Button> <Button variant="dark">Block</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Suspense>
      </Table>
    </TableContainer>
    </center>
    </div>);
}