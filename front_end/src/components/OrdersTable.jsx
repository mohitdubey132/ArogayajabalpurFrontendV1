import React , {Suspense ,useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function OrdersTable({orders}) {
   console.log(orders)
  return (
    <div style={{width:"100%" , display:"flex",justifyContent:"center"}}>
    <center>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"black",color:"lightblue"}}>
            <TableCell style={{color:"lightblue"}}>Ordering Date</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">payment Id</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">totalPrice</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">orderStatus</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">view detalis</TableCell>
            <TableCell style={{color:"lightblue"}}   align='right'>Options</TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<HashLoader color="#d65c36" />}>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.paymentInfo.id}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              <TableCell align="right">{row.orderStatus}</TableCell>
              <TableCell align="right"><Link to={`/admin/order/${row._id}`}>view deatails</Link> </TableCell>
               <TableCell align="right"><Button variant='success'>shiped</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Suspense>
      </Table>
    </TableContainer>
    </center>
    </div>);
}