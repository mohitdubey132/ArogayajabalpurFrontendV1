//import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { Fetch } from '../dbFatch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef, useState } from 'react';
//import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import { useApplicationContext } from '../context'

const Signin = () => {
  const [imageUrl, setImageUrl] = useState('');
  const fileToUploadRef = useRef(null);
  const navigate = useNavigate();
  const navigateBack = () => {
    setTimeout(() => { navigate(-2); }, 3000)
  }
  const { setUser } = useApplicationContext();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      address: "",
      bloodGroup: "",
      avtar: {
        public_id: "sample_Id",
        url: "sample_URL"
      },
      images: {
        public_id: "",
        url: ""
      }
    },
    validationSchema: new Yup.ObjectSchema({
      name: Yup.string().min(2, 'too small name').max(25, 'too big name').required('required'),
      email: Yup.string().email('invalid email Id ').required('required'),
      number: Yup.string().max(11, 'number must contain 10 number only').required('required'),
      password: Yup.string().max(10, 'too big password').min(3, 'too small password').required('required'),
      address: Yup.string().min(10, 'give some other big password').max(130, 'too big address').required('required'),
      bloodGroup: Yup.string()
    }),
    // onSubmit: async(values) => {
    //   console.log(values);
    // },
    onSubmit: async (values) => {
      console.log("hi there i am working");
      /**upload image 
       * if success full set value of avtar 
       * else return from 
       */
      const uploadedImage = await handleImageUpload();
      if (uploadedImage) {
        values.avtar.url = uploadedImage.secure_url;
        values.avtar.public_id = uploadedImage.public_id;
      }
      // else {
      //   return
      // }


      console.log(values.initialValues);
      signUpAPI(values);
    }


  });
  async function signUpAPI(data) {
    const path = '/api/v1/register';
    //delete data.initialValues;
    console.log(data.data)
    const response = await Fetch(path, data);
    if (response.success) {
      console.log(response)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success('Registed successfully', { position: 'top-right', theme: 'colored' });
      setUser(response.user);
      navigateBack();
    }
    else {
      console.log('error');
      toast.error(` ${response.message}`)
    }
  };
  const handleImageUpload = async () => {
    //   if (fileToUploadRef.current.file.length > 0) {
    if (fileToUploadRef.current !== null) {
      console.log(fileToUploadRef)
      console.log(fileToUploadRef.current)
      console.log(typeof fileToUploadRef)
      console.log(typeof fileToUploadRef.current)
      const file = fileToUploadRef.current.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your upload preset

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/de69jwyrb/image/upload`, // Replace with your Cloudinary cloud name
          {
            method: 'POST',
            body: formData
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setImageUrl(data.secure_url);
          return data;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      catch (err) {
        console.error(err);
        toast.error('can not upload this picture');
        return null
      }
    }
    else {
      return null;
    }
  };
  return (
    <div style={{ display: "flex", marginTop: "5.5rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%" }}>
      <form onSubmit={formik.handleSubmit} style={{ display: "flex", marginTop: "2rem", backgroundColor: "white", flexDirection: "column", alignItems: 'baseline', justifyContent: "center", width: "80%", padding: "2rem", border: "1px solid #E0E0E0", borderRadius: "4px" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="name" style={{ fontWeight: "bold" }}>Name</label>
            <input name='name'
              type='text'
              placeholder='Enter name'
              value={formik.values.name}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
            />{formik.touched.name && formik.errors.name ? (
              <div style={{ color: "Red" }}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor='email' style={{ fontWeight: "bold" }}>Email</label>
            <input name='email'
              type='email'
              placeholder='abc@xyz.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
            />{formik.touched.email && formik.errors.email ? (
              <div style={{ color: "Red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" ,flexWrap:"wrap"}}>
          <div style={{ flex: 1 }}>
            <label htmlFor='password' style={{ fontWeight: "bold" }}>Password</label>
            <input name='password'
              type='password'
              placeholder='********'
              value={formik.values.password}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
            />{formik.touched.password && formik.errors.password ? (
              <div style={{ color: "Red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor='number' style={{ fontWeight: "bold" }}>Number</label>
            <input name='number'
              type='text'
              placeholder='Enter number'
              value={formik.values.number}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
            />{formik.touched.number && formik.errors.number ? (
              <div style={{ color: "Red" }}>{formik.errors.number}</div>
            ) : null}
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <label htmlFor='address' style={{ fontWeight: "bold" }}>Address</label>
            <textarea name='address'
              type='text'
              placeholder='Enter address'
              value={formik.values.address}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem", minHeight: "100px" }}
            />{formik.touched.address && formik.errors.address ? (
              <div style={{ color: "Red" }}>{formik.errors.address}</div>
            ) : null}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="bloodgroup" style={{ fontWeight: "bold" }}>Blood Group</label>
            <select name="bloodgroup"
              value={formik.values.bloodgroup}
              onChange={formik.handleChange}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ flex: 1, marginLeft: "2rem",alignContent:"center" }}>
            <label htmlFor="Images" style={{ fontWeight: "bold" }}>Upload an Image</label>
            <input type="file" ref={fileToUploadRef} />
            {imageUrl ? <img src={imageUrl} height={"50px"} width={"50px"} alt='uploaded' /> : null
            }
          </div>
        </div>
        <div style={{ flex: 1, marginRight: "1rem" }}>
          <button type='submit' style={{ backgroundColor: "#007BFF", color: "#FFF", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", marginTop: "1rem", cursor: "pointer", }}>
            Submit
          </button>
        </div>

      </form >

      <ToastContainer theme='colored' />
    </div >
  )
}

export default Signin;