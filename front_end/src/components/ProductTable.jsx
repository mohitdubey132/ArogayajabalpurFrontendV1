import React , {Suspense } from 'react';
import HashLoader from "react-spinners/HashLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ProductTable({products}) {
  console.log(products)
  return (
    <div style={{width:"100%" , display:"flex",justifyContent:"center"}}>
    <center>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"black",color:"lightblue"}}>
            <TableCell style={{color:"lightblue"}}>Product Name</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Manufacturer</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Price</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">Stock</TableCell>
            <TableCell style={{color:"lightblue"}} align="right">createdAt</TableCell>
            <TableCell style={{color:"lightblue"}}   align='right'>Options</TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<HashLoader color="#d65c36" style={{top:'50%'}} />}>
   
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <div style={{display:"flex",flexDirection:"column"}}>
               <img src={row.images.url} height={"200px"} width={"200px"}/> 
                <h2>{row.name}</h2></div> 
              </TableCell>
              <TableCell align="right">{row.Product_details.Manufacturer}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.Stock}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              {/* <TableCell align="right"><img src={row.images.url} height={"200px"}/></TableCell> */}
 
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