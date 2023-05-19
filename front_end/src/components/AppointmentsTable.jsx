import React, { Suspense } from 'react';
import HashLoader from "react-spinners/HashLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AppointmentsTable({ appointments }) {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <center>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "black", color: "lightblue" }}>
                <TableCell style={{ color: "lightblue" }}>Doctors Name</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Contect .No </TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Date</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Status</TableCell>
                <TableCell style={{ color: "lightblue" }} align="right">Address</TableCell>
                <TableCell style={{ color: "lightblue" }} align='right'>Options</TableCell>
              </TableRow>
            </TableHead>
            <Suspense fallback={<HashLoader color="#d65c36" />}>
              <TableBody>
                {appointments.map((row) => (
                  <TableRow
                    key={row?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {(row?.doctor_id?.name && row?.doctor_id?.name !== null) ? (<>
                        {row?.doctor_id?.name}</>
                      )
                        : ('')}
                    </TableCell>
                    <TableCell align="right">
                    {(row?.doctor_id?.number !== null) ? (<>
                        {row?.doctor_id?.number}</>
                      )
                        : ('')}</TableCell>
                    <TableCell align="right">{row?.date}</TableCell>
                    <TableCell align="right">{row?.status??""}</TableCell>
                    <TableCell align="right">  {(row?.doctor_id !== null) ? (<>
                      {row?.doctor_id?.address} </>
                      )
                        : ('')}</TableCell>
                    <TableCell align="right">view details</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Suspense>
          </Table>
        </TableContainer>
      </center>
    </div>);
}