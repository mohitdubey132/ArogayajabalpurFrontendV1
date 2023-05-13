import React ,{ Suspense, useState } from 'react'
import { Get } from '../dbFatch';
import DoctorsTable  from '../components/DoctorsTable';
export  const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([])
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
  return (
    <section style={{ display: "flex", marginTop: "12rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%", flexDirection: "column" }}>
    <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>All Listed Doctors</div>
    <DoctorsTable doctors={doctors} />
  </section>
  )
};

