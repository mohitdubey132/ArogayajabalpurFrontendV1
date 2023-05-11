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
import doctors from '../assets/doctors.jpeg';


const DoctorSigin = () => {
  const [imageUrl, setImageUrl] = useState('');
  const fileToUploadRef = useRef(null);
  const navigate = useNavigate();
  const navigateBack = () => {
    setTimeout(() => { navigate(-1); }, 5000)
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      password: "",
      registerationNumber: "",
      address: "",
      specialization: "",
      fees: '',
      availability: {
        openning: "",
        clooseing: ""
      },
      images: {
        public_id: "",
        url: ""
      }
    },
    validationSchema: new Yup.ObjectSchema({
      name: Yup.string().max(25, 'Name is too long').min(3, 'Name is too small').required('required'),
      email: Yup.string().email('invalid email Id ').required('required'),
      number: Yup.string().max(11, 'number must contain 10 number only').required('required'),
      password: Yup.string().max(10, 'too big password').min(3, 'too small password').required('required'),
      address: Yup.string().min(10, 'give some other big password').max(130, 'too big address').required('required'),
      registerationNumber: Yup.string().max(8, ' registration number must contain at max  8 number only').required('required'),
      specialization: Yup.string().required('Required '),
      // availability: {
      //   openning: Yup.string().required('Required ')
      // //  clooseing: Yup.string().required('Required ')
      // },
      fees: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const uploadedImage = await handleImageUpload();
      if (uploadedImage) {
        values.images.url = uploadedImage.secure_url;
        values.images.public_id = uploadedImage.public_id;
      }
      else {
        return
      }

      console.log(values.initialValues);
      signUpAPI(values);
    }
  });
  const signUpAPI = async (data) => {
    const path = '/api/v1/doctors/registration';
    delete data.initialValues;
    console.log(data.data)
    const response = await Fetch(path, data);
    if (response.success) {
      console.log(response)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.doctor._id);
      localStorage.setItem('role', response.doctor.role);
      toast.success('Registed successfully', { position: 'top-right', theme: 'colored' });
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
          toast.success("photo uploaded successfully");
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
    <div>DoctorSigin
      <div style={{ display: "flex", marginTop: "5rem", alignContent: "center", justifyContent: "center", backgroundColor: "", width: "100%" }}>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", margin: "2rem", backgroundColor: "white", flexDirection: "column", alignItems: 'baseline', justifyContent: "center", width: "90%", padding: "2rem", border: "1px solid #E0E0E0", borderRadius: "4px" }}>
          <div style={{display:"flex"}}>  <img src={doctors} height={"55px"} width={"55px"} />
          <strong> Register as DOCTOR  </strong>
          </div>
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
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
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
            <div style={{ flex: 1}}>
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
              <label htmlFor="" style={{ fontWeight: "bold" }}>specialization</label>
              <select name="specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              >
                <option value="">Select specialization</option>
                <option value="General Medicine/Internal Medicine">General Medicine/Internal Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="ENT (Ear, Nose, and Throat)">ENT (Ear, Nose, and Throat)</option>

              </select>
            </div>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <div style={{ flex: 1}}>
              <label htmlFor='image' style={{ fontWeight: "bold" }}>Uploaded You Image</label>
              <input name='image' type="file" ref={fileToUploadRef} />
              {imageUrl ? <img src={imageUrl} height={"30px"} width={"30px"} alt='uploaded' /> : null
              }
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor='fees' style={{ fontWeight: "bold" }}>Fees</label>
              <input name='fees'
                type='text'
                placeholder='Enter fees'
                value={formik.values.fees}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: ".5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />{formik.touched.fees && formik.errors.fees ? (
                <div style={{ color: "Red" }}>{formik.errors.fees}</div>
              ) : null}
            </div>

          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="registerationNumber" style={{ fontWeight: "bold" }}>Registeration Number</label>
              <input name='registerationNumber'
                type='text'
                placeholder='Enter registerationNumber'
                value={formik.values.registerationNumber}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />{formik.touched.registerationNumber && formik.errors.registerationNumber ? (
                <div style={{ color: "Red" }}>{formik.errors.registerationNumber}</div>
              ) : null}
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor='openning' style={{ fontWeight: "bold" }}>Openning Time</label>
              <label htmlFor='opening' style={{ fontWeight: "bold" }}>Opening Time</label>
              <input name='availability.openning'
                type='time'
                placeholder='Opening Time'
                value={formik.values.availability.openning}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />
              <label htmlFor='opening' style={{ fontWeight: "bold" }}>Opening Time</label>
              <input name='availability.clooseing'
                type='time'
                placeholder='Opening Time'
                value={formik.values.availability.clooseing}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />

              {/* <label htmlFor='closing' style={{ fontWeight: "bold" }}>Closing Time</label>
              <input name='availability.clooseing'
                type='time'
                placeholder='Closing Time'
                value={formik.values.availability.clooseing}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />
              {formik.touched.availability.clooseing && formik.errors.availability.clooseing ? (
                <div style={{ color: "red" }}>{formik.errors.availability.clooseing}</div>
              ) : null} */}

            </div>
          </div>
          <button type='submit' style={{ backgroundColor: "#007BFF", color: "#FFF", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", marginTop: "1rem", cursor: "pointer", }}>
            Submit
          </button>
        </form>

        <ToastContainer theme='colored' />
      </div>
    </div>
  )
}

export default DoctorSigin