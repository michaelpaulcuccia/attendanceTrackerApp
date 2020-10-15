import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import StudentTable from './Tables/StudentTable';
import ClassTable from './Tables/ClassTable';
import StudentCheckIn from './StudentCheckIn/StudentCheckIn';
import './StylesAndImages/AppStyle.css';

const App = () => {

  const [showStudent, setShowStudent] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  
  const handleShowStudent = () => {
    setShowStudent(!showStudent);
  };

  const handleShowClass = () => {
    setShowClass(!showClass);
  };

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown)
  };

  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="#home">Radji Barrett Jiu-Jitsu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Select" id="basic-nav-dropdown">
              <NavDropdown.Item onSelect={handleShowDropDown}>Student Check-In</NavDropdown.Item>
              <NavDropdown.Divider />             
              <NavDropdown.Item onSelect={handleShowStudent}>Students - Admin</NavDropdown.Item>
              <NavDropdown.Item onSelect={handleShowClass}>Classes - Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

      {showDropDown &&
      <StudentCheckIn/>
      }
     
      {showStudent && 
      <StudentTable 
        showStudent={showStudent}
        setShowStudent={setShowStudent}
      />}
      <br></br>
      {showClass && 
      <ClassTable 
        showClass={showClass}
        setShowClass={setShowClass}
      />}

    </div>
  );
}

export default App;
