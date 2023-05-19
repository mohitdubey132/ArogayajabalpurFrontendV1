import React from 'react';
import ProductCards from './ProductCards';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button }from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useApplicationContext } from '../context'
export  const CartItems = ({product}) => {
    const {  increaseCartQuantity ,getItemsQuantity,decreaseCartQuantity,removeItems } = useApplicationContext()     
    const countaty = getItemsQuantity(product?._id)
  return (<Card  key={product?._id} sx={{ maxWidth: 345 }}>
    {/* {console.log(product.images)} */}
    
    {(product.images !== undefined) ? (
        <img src={product.images?.url} height={"200px"} style={{ alignSelf: "center" }} />

    )
        : ('')}
    <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
                {product?.name}
            </Typography>
            <Typography variant='h6'  >
                {product?.price}₹
            </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
            category -   {product?.category}
            <br />
            {product?.description}
        </Typography>
    </CardContent>
    <CardActions>
    { 
    countaty === 0 ? (<Button className='w-100' onClick={()=>{increaseCartQuantity(product._id)
    console.log('working add button')}} >Add to Cart</Button>) : (
        <div style={{display:"flex" ,flexDirection:"column",alignContent:"center",justifyContent:"center",width:"100%"}}>
            <div style={{display:'flex',alignContent:"center",justifyContent:"center"}}>
                <Button onClick={()=>decreaseCartQuantity(product?._id)} >-</Button>
                <div><span style={{fontSize:"1.5rem"}}>{countaty}</span> in cart</div>
                <Button onClick={()=>increaseCartQuantity(product?._id)}>+</Button>
            </div>
            <Button onClick={()=>removeItems(product?._id)} variant='danger'>remove</Button>
        </div>
    )}    
    </CardActions>
</Card>
  )
}

