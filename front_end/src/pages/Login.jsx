import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Fetch } from '../dbFatch';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Login = () => {
  const navigator = useNavigate();
  const navigateBack = () => {
    navigator(-1);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: new Yup.ObjectSchema({

      email: Yup.string().email('invalid email Id ').required('required'),
      password: Yup.string().max(10, 'too big password').min(3, 'too small password').required('required'),

    }),
    // onSubmit: async(values) => {
    //   console.log(values);
    // },
    onSubmit: (values) => {
      console.log(values)
      signUpAPI(values);
    }


  })
  async function signUpAPI(data) {
    const path = '/api/v1/Login';
    delete data.initialValues;
    console.log(data.data)
    const response = await Fetch(path, data);
    if (response.success === true) {
      console.log(response)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success(`loging successfully ${response.user.name}}`, { position: 'top-right', theme: 'colored' });
      setTimeout(() => { navigateBack() },
        3000)
    }
    if (response.error) {
      toast.error('Password or email did not match', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };
  return (
    <div style={{ display: "flex", marginTop: "5rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%" }}>

      <form onSubmit={formik.handleSubmit} style={{ display: "flex", padding: "5px", marginBottom: "3rem", marginTop: "6rem", backgroundColor: "white", flexDirection: "column", alignItems: 'baseline', justifyContent: "center", boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)", borderRadius: "15px" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "column", }}>
          <div style={{ width: "100%", alignContent: "center" }}>
            <center>< AccountCircleIcon style={{ height: "60px", width: "60px", color: "blue" }} />
              <h2>Login</h2> </center>
          </div>

          <div>    <label for='Email' >EMAIL</label>
            <input name='email'
              type='email'
              placeholder='abc@xyc.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              style={{ width: "100%", borderRadius: "15px", textAlign: "center" }}
            />
          </div>
          <div>
            <label for='Password' >PASSWORD</label>
            <input name='password'
              type='password'
              placeholder='fht@h'
              value={formik.values.password}
              onChange={formik.handleChange}
              style={{ width: "100%", borderRadius: "15px", textAlign: "center" }}
            />
          </div>
        </div>

        <Button type='submit' className='w-100 ' variant='2rem' style={{ backgroundColor: "blue", color: "white" }} >SUBMIT</Button>
        {console.log(formik.values)}
        {console.log(formik.errors)}
        <h6>
          For New users<Link to={'/signin'}><u>Sign UP</u></Link> from here.
        </h6>

      </form>
      {/* {<div>
        {formik.values.name}
        {formik.values.email}

        {formik.values.number}
        {formik.values.address}   
        {formik.values.bloodGroup}
        {formik.values.password}
      </div>
      } */}
      <ToastContainer />
    </div>
  )
}

export default Login