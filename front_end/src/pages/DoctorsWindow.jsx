import React ,{useState,useEffect} from 'react';
import { Get } from '../dbFatch';
import { DoctorCardCollection } from '../components/DoctorCardCollection';
export const DoctorsWindow = () => {
  const [doctors, setDoctors] = useState([{}])
  useEffect(() => {
    async function getDoctorsAPIs() {
      const path = '/api/v1/doctors/';
      const response = await Get(path);
      if (response.success === true) {
        console.log(response)
        setDoctors(response.doctor)
       // setTimeout(() => { setDoctors(response.doctor); }, 1000)
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
 
  return ( <>
  <section style={{ display: "flex", marginTop: "12rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%", flexDirection: "column" }}>
    <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>Our Doctors </div>
    <DoctorCardCollection doctors={doctors} />
  </section>
  </>
 
  )
};
