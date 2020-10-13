import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import StudentTable from './Tables/StudentTable';
import ClassTable from './Tables/ClassTable';
//import EditClassModal from './Modals/EditClassModal';

const App = () => {

  const [showStudent, setShowStudent] = useState(false);
  const [showClass, setShowClass] = useState(false);

  const handleShowStudent = () => {
    setShowStudent(!showStudent)
  };

  const handleShowClass = () => {
    setShowClass(!showClass)
  };

  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="#home">Radji Barrett Jiu-Jitsu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Select" id="basic-nav-dropdown">
              <NavDropdown.Item onSelect={handleShowStudent}>Students</NavDropdown.Item>
              <NavDropdown.Item onSelect={handleShowClass}>Classes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="home">Home</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

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

      {/* <EditClassModal/> */}
    </div>
  );
}

export default App;
