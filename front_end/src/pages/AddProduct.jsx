import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useApplicationContext } from '../context';
import { Fetch } from '../dbFatch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState('');
  const fileToUploadRef = useRef(null);
  const { user } = useApplicationContext();
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate('/admin/addProduct');
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      Stock: "",
      user: "",
      images: {
        public_id: "",
        url: ""
      },
      Product_details: {
        Country_of_Origin: "",
        Manufacturer: "",
        Net_Quantity: ""
      }
    },
    validationSchema: new Yup.ObjectSchema({
      name: Yup.string().max(25, 'Name is too long').min(3, 'Name is too small').required('required'),
      description: Yup.string().required('Required '),
      Stock: Yup.string().required('Required '),
      category: Yup.string().required('Required'),
      price: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const uploadedImage = await handleImageUpload();
      if (uploadedImage) {
        values.images.url = uploadedImage.secure_url;
        values.images.public_id = uploadedImage.public_id;
        values.user = user._id;
      }
      else {
        return
      }

      console.log(values.initialValues);
      productCreationAPI(values);
    },
    // onReset
  });
  const productCreationAPI = async (data) => {
    const path = '/api/v1/products/new';
    delete data.initialValues;
    console.log(data.data)
    const response = await Fetch(path, data);
    if (response.success) {
      console.log(response)
      // localStorage.setItem('token', response.token);
      // localStorage.setItem('user', response.doctor._id);
      // localStorage.setItem('role', response.doctor.role);
      toast.success('product created successfully', { position: 'top-right', theme: 'colored' });
      navigateBack('/admin/ViewProducts');
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
    <>
      <section style={{ width: "100%", height: "100%", marginTop: "6rem" }}>
     
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", margin: "2rem", backgroundColor: "white", flexDirection: "column", alignItems: 'baseline', justifyContent: "center", width: "90%", padding: "2rem", border: "1px solid #E0E0E0", borderRadius: "4px" }}>
        <div style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "serif", alignSelf: "center" }}>Add Product</div>
          <div style={{ display: "flex" }}>
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
              <label htmlFor='description' style={{ fontWeight: "bold" }}>description</label>
              <input name='description'
                type='text'
                placeholder=''
                value={formik.values.description}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />{formik.touched.description && formik.errors.description ? (
                <div style={{ color: "Red" }}>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor='price' style={{ fontWeight: "bold" }}>Price</label>
              <input name='price'
                type='text'
                placeholder='500 -₹'
                value={formik.values.price}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />{formik.touched.price && formik.errors.price ? (
                <div style={{ color: "Red" }}>{formik.errors.price}</div>
              ) : null}
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor='stock' style={{ fontWeight: "bold" }}>Stock</label>
              <input name='Stock'
                type='text'
                placeholder='Enter number'
                value={formik.values.Stock}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />{formik.touched.Stock && formik.errors.Stock ? (
                <div style={{ color: "Red" }}>{formik.errors.Stock}</div>
              ) : null}
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor='image' style={{ fontWeight: "bold" }}>Uploaded You Image</label>
              <input name='image' type="file" ref={fileToUploadRef} />
              {imageUrl ? <img src={imageUrl} height={"30px"} width={"30px"} alt='uploaded' /> : null
              }
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="" style={{ fontWeight: "bold" }}>Category</label>
              <select name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              >
                <option value="">Select Category</option>
                <option value="Mother and Baby Care">Mother and Baby Care</option>
                <option value="Diabetic care">Diabetic care</option>
                <option value="Fitness supplements">Fitness supplements</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Sexual Wellness">Sexual Wellness</option>
                <option value="others">others</option>
               
              </select>
            </div>


          </div>
          <hr/><center><strong>Product details</strong></center>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor='Countroy of Origin' style={{ fontWeight: "bold" }}>Country_of_Origin</label>
              <input name='Product_details.Country_of_Origin'
                type='text'
                placeholder='enter Countroy name'
                value={formik.values.Product_details.Country_of_Origin}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />
            </div>
            <div style={{flex:1}} >

            </div>
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor='Manufacture' style={{ fontWeight: "bold" }}>Manufacturer</label>
              <input name='Product_details.Manufacturer'
                type='text'
                placeholder='xyz.pvt.ldd'
                value={formik.values.Product_details.Manufacturer}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor='Countroy of Origin' style={{ fontWeight: "bold" }}>Net_Quantity</label>
              <input name='Product_details.Net_Quantity'
                type='text'
                placeholder='Enter the number '
                value={formik.values.Product_details.Net_Quantity}
                onChange={formik.handleChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #E0E0E0", marginTop: "0.5rem" }}
              />
            </div>
          </div>
         
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

           <div style={{display:"flex",justifyContent:"space-between",width:"50%"}}>
          <button type='submit' style={{ backgroundColor: "#007BFF", color: "#FFF", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", marginTop: "1rem", cursor: "pointer", }}>
            Submit
          </button>
          {/* <Button variant='outline-denger' type='reset' style={{ backgroundColor: "red", color: "#FFF", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", marginTop: "1rem", cursor: "pointer", }} >Reset</Button> */}
          </div>
        </form>
       < ToastContainer/> </section >
    </>
  )
}

