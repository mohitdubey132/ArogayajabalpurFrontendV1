import React, { Suspense } from 'react';
import { Button } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';
export const DoctorCardCollection = ({ doctors }) => {
  { console.log(doctors) }
  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between", flexWrap: "wrap", flexDirection: "row" }}>
        <Suspense fallback={<HashLoader color="#d65c36" />}>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", flexWrap: "wrap", flexDirection: "row" }}>
            {doctors.map((doctor) => (
            <div style={{width:"24%" ,marginRight:".5rem" , boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)"}}>
              <div key={doctor._id} style={{ display: "flex", flexDirection: "row", marginTop: ".5rem", padding: "auto" }}>
                {/* <img src={doctor.images.url ?? ''} height={'150px'} width={'150px'} alt={`${doctor.name}'s profile picture`} /> */}
                {(doctor.images !== undefined) ? (
                  <img src={doctor.images.url} height={"200px"} width={"180px"} style={{ alignSelf: "center" }} />
                )
                  : ('')}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2> Dr. {doctor?.name}</h2>
                  {doctor?.specialization}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                Addres: {doctor?.address}
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: 'baseline' }}>
                <div style={{ display: "flex", flexDirection: "column" ,width:"80%",justifyContent:"space-between" }}>
                  <h2>Timing</h2>
                  <h5>{(doctor.availability?.openning !== undefined)?(doctor.availability?.openning):('')}  to {doctor.availability?.clooseing}</h5>
                </div>
                <strong>Fee: {doctor.fees}</strong>
              </div>
              <center><Button onClick={()=>{navigate(`/user/bookAppointment/${doctor._id}`)}} >Book apponitment</Button></center>
            </div>))}
          </div>
        </Suspense>
      </div>
    </>
  );
}