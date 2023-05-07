import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useApplicationContext} from '../context'

const Cart = ({isOpen}) => {
  const {closeCart} = useApplicationContext();
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:"2rem",color:"red"}}>My Cart </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {/* jkffdkj if a f ka. */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
