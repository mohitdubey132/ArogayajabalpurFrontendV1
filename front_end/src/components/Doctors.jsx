import React from 'react'
import img1 from '../assets/WhatsApp Image 2023-04-23 at 12.56.50 AM.jpeg';
import { Button } from 'react-bootstrap';
export const Doctors = ({doctorDetailes:{name, email ,number ,address ,specialization, images ,availability,fees}}) => {
    console.log('from doctes components')
    console.log(name)
    return (
        
        <>
            <div style={{ display: "flex", flexDirection: "row",marginTop:".5rem",padding:"auto"}}>
                <img src={images.url ?? img1} height={'150px'} width={'150px'} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Mr.Raju ram raja {name} </h2>
                    <h3>Genral medicine {specialization} </h3>
                </div>
            </div>

           <div style={{display:"flex",justifyItems:"baseline"}}> 
           <strong><p>Address</p></strong>
           <p>ranjhi jabalpur <strong>482007</strong> {address}</p>
           </div>
            <div style={{ display: "flex", flexDirection: "row" ,alignContent:'baseline'}}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Timing</h2>
                    <h3>08:30 {availability.openning} to 15:30 {availability.clooseing}</h3>
                </div>
                <strong>fee :300{fees}</strong>
            </div>
            <center><Button >view Details</Button></center>
            
        </>
    )
};

