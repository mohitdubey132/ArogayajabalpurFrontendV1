import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApplicationContext } from '../context'
import { useNavigate } from 'react-router-dom';
import { Get } from '../dbFatch';
import { toast, ToastContainer } from 'react-toastify';
export const Menu = ({ isOpen }) => {
  const { closeMenu, setUser } = useApplicationContext();
  const navigator = useNavigate();
  async function LogOutAPIs() {
    const path = '/api/v1/logout';
    const response = await Get(path);
    if (response.success === true) {
      console.log(response)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({});
      closeMenu();
      toast.success(`logout successfully ${response.user.name}}`, { position: 'top-right', theme: 'colored' });
      navigator(-1);
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
    <>
      <Offcanvas show={isOpen} onHide={closeMenu} placement="start" style={{ width: "250px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: "2rem", color: "red" }}>user </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section >
            <button>My orders</button>
            <button onClick={() => { navigator('/Login') }}>switch to other account</button>
            <button onClick={LogOutAPIs}>logout</button>
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
