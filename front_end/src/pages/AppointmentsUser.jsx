import React, { Suspense, useState } from 'react'
import { Get } from '../dbFatch';
import AppointmentsTable from '../components/AppointmentsTable';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export const AppointmentsUser= () => {
  const [appointment, setAppointment] = useState([])
 useEffect(()=>{async function getAppointmentAPIs() {
  const path = '/api/v1/user/getAllAppointment';
  const response = await Get(path);
  if (response.success === true) {
    console.log(response)
    setTimeout(() => { setAppointment(response.appointment); }, 6000)
  }
  if (response.error) {
            toast.error('Internal server issue ', { position: 'top-right', theme: 'colored' });

  }
  if (!response) {
    console.log('error');
    toast.error('Server issue', { position: 'top-right', theme: 'colored' })
  }
};

getAppointmentAPIs();},[])
  
  return (
    <section style={{ display: "flex", marginTop: "12rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%", flexDirection: "column" }}>
      <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>Appointment</div>
      <AppointmentsTable appointments={appointment} />
    </section>
  )
}

