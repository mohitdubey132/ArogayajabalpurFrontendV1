import React ,{ Suspense, useState } from 'react'
import { Get } from '../dbFatch';
import DoctorsTable  from '../components/DoctorsTable';
import { useEffect } from 'react';
export  const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([])
useEffect(() => {
  async function getDoctorsAPIs() {
    const path = '/api/v1/admin/doctor/';
    const response = await Get(path);
    if (response.success === true) {
      console.log(response)
      setTimeout(() => { setDoctors(response.doctor); }, 6000)
    }
    if (response.error) {
          //    toast.error('Internal server issue ', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
   //   toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };

  getDoctorsAPIs();
}, [])
function uppdateDoctors(id ,response){
  setDoctors(currDoctor =>{
    return currDoctor.filter(doctor=> doctor?._id !== id)
  })
  setDoctors(currDoctor =>{
    return [...currDoctor,response?.doctor]
  })
} 

  return (
    <section style={{ display: "flex", marginTop: "12rem", alignContent: "center",
     justifyContent: "center", backgroundColor: "", width: "100%", 
     flexDirection: "column" }}>
    <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>All Listed Doctors</div>
    <DoctorsTable doctors={doctors} updateDoctors={uppdateDoctors} />
  </section>
  )
};

