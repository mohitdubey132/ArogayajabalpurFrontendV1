import React from 'react'
import { Doctors } from '../components/Doctors';

export const DoctorsWindow = () => {
  return (
    <div style={{  display: "flex", marginTop:"5rem",flexDirection: "row",backgroundColor:"lightblue", gap: "10px", flexWrap: "wrap", width: "100%", height: "100%", alignItems: "center", paddingTop: "2rem"  }}>
      <div style={{ border: '2px black', borderRadius: "20px", backgroundColor: "ghostwhite" }}><Doctors /></div>
      <div style={{ border: '2px black', borderRadius: "20px", backgroundColor: "ghostwhite" }}><Doctors /></div>
      <div style={{ border: '2px black', borderRadius: "20px", backgroundColor: "ghostwhite" }}><Doctors /></div>
      <div style={{ border: '2px black', borderRadius: "20px", backgroundColor: "ghostwhite" }}><Doctors /></div>
    </div>
  )
};

