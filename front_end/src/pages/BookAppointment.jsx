import React, { useEffect, useState, Suspense } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { Fetch, Get } from '../dbFatch';
import { useApplicationContext } from '../context';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'react-bootstrap';
const BookAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([{}])
  const { user } = useApplicationContext();
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      user_id: "",
      doctor_id: ""
    },
    validationSchema: new Yup.ObjectSchema({
      data: Yup.string().required('Required'),
     // time: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      values.user_id = user._id;
      values.doctor_id = id
      bookingAPI(values);
    }
  });
  async function bookingAPI(data) {
    const path = '/api/v1/user/bookAppointment';
    // delete data.initialValues;
    console.log(data)
    const response = await Fetch(path, data);
    if (response.success === true) {
      console.log(response)
      toast.success(`Booking Appication send successfully `, { position: 'top-right', theme: 'colored' });
      //   navigator(-1);
    }
    if (response.error) {
      toast.error('Password or email did not match', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };

  useEffect(() => {
    async function getDoctorAPIs() {
      const path = `/api/v1/user/doctor/${id}`;
      const response = await Get(path);
      if (response.success === true) {
        console.log(response)
        setDoctor(response.doctor)
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
    getDoctorAPIs();
  }, [])
  return (
    <div style={{ display: "flex", marginTop: "10rem", alignContent: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "", width: "100%" }}>
      <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>BookAppointment</div>
      {(user.role === 'user') ? (<Suspense fallback={<HashLoader color="#d65c36" />}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
          <form style={{ display: "flex", width: "300px", flexDirection: "column", gap: ".5rem", padding: "auto", justifyContent: "center", alignContent: "center", border: "1px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)" }}>
            {(doctor.images !== undefined) ? (
              <img src={doctor.images.url} height={"200px"} width={"150px"} style={{ borderRadius: "30px", alignSelf: "center" }} />
            )
              : ('')}
            <h5 style={{ width: "200px", alignSelf: "center" }}>{doctor.name}</h5>
            <h6 style={{ width: "200px", alignSelf: "center" }}>{doctor.specialization}</h6>
            <label for='Date' style={{ width: "200px", alignSelf: "center" }}>Date</label>

            <input type='date' name='date' style={{ width: "200px", alignSelf: "center" }} value={formik.values.date}
              onChange={formik.handleChange} />
            <label for='Time' style={{ width: "200px", alignSelf: "center" }}>time</label>
            <input type='time' name='time' style={{ width: "200px", alignSelf: "center" }} 
              onChange={formik.handleChange} value={formik.values.time} />
            <Button type='submit' className='w-100 ' variant='2rem' style={{ backgroundColor: "blue", color: "white" }} >SUBMIT</Button>
          </form>
        </div>
      </Suspense>) : (<h3 style={{ color: "red", width: "100%", textAlign: "center" }}>first you have to login </h3>)}
      <ToastContainer /> </div>
  )
}

export default BookAppointment