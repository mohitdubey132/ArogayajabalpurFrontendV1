import React from 'react';
import errorImg from '../assets/404-error-page-not-found-miss-paper-with-white-vector-20577349.png'
import { useNavigate } from 'react-router-dom'
const Error = () => {
const navigate = useNavigate()
const goback = setTimeout(()=>{
    navigate('/')
},3000)
  return (
    <div style={{alignContent:"center",justifyContent:"center" ,width:"100%",height:"100%"}}>
      <img src={errorImg} height={"60%"} width={"80%"}  />
        {goback}
    </div>
  )
}

export default Error