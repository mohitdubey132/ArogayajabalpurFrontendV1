import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useApplicationContext} from '../context'

const Filter = ({isOpen}) => {
  const {closeFilter} = useApplicationContext();
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeFilter} placement="start" style={{width:"300px" ,height:"auto",top:"10%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:"2rem"}}>Use Filter for Easy</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
        <form>
            <label for='max Price' >max Price</label>
            <input type="number" />
            <label for='minimum Price' >min Price</label>
            <input type="number" />
            <Button type='submit' style={{margin:"2rem"}}>apply Filter</Button>
          </form> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filter;
