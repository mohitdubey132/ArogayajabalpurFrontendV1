import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApplicationContext } from '../context'
import { useNavigate } from 'react-router-dom';
import { Get } from '../dbFatch';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
export const Menu = ({ isOpen }) => {
  const { closeMenu, setUser, user } = useApplicationContext();
  const navigator = useNavigate();
  async function LogOutAPIs() {
    const path = '/api/v1/logout';
    const response = await Get(path);
    if (response.success === true) {
      console.log(response);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({});
      Cookies.remove("token");
      
      closeMenu();
      toast.success(`logout successfully ${response.user.name}}`, { position: 'top-right', theme: 'colored' });
      navigator(-1);
    }
    if (response.error) {
      toast.error('Not login in the system', { position: 'top-right', theme: 'colored' });

    }
    if (!response) {
      console.log('error');
      toast.error('Server issue', { position: 'top-right', theme: 'colored' })
    }
  };

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeMenu} placement="start" style={{ width: "250px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: "2rem", color: "red" }}>{user.role} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section style={{ display: "flex", flexDirection: "column", height: "50%"}}>
            {user.role === 'admin' ? (
              <div style={{ display: "flex", flexDirection: "column" , justifyContent: "space-between"}}>
                {/* <Link to='/admin'>Dash Board</Link> */}
                {/* <Link to='/'>Home</Link> */}
                <Link to='/admin/addProduct'>Add Poduct</Link>
                <Link to='/Login'>switch to other account</Link>
                <Link to="/admin/ViewProducts">Products</Link>   
                <Link to="/admin/viewDoctor" >Add Doctors</Link> 
                <Link to="/admin/orders">View Orders</Link> 
              </div>
            ) : ('')}
            {/* <button>My orders</button> */}
            
            <Button onClick={LogOutAPIs}  >logout</Button>
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
