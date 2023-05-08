import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useApplicationContext} from '../context'
import { useNavigate } from 'react-router-dom';
export const Menu = ({isOpen}) => {
  const {closeMenu} = useApplicationContext();
  const navigator = useNavigate();
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeMenu} placement="start" style={{width:"250px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:"2rem",color:"red"}}>user </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <section >
                <button>My orders</button>
                <button onClick={()=>{navigator('/Login')}}>switch to other account</button>
                <button>logout</button>
            </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
