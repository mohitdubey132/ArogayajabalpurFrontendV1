import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Cart = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
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
