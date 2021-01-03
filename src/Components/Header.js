import React from "react";

import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="headerH">
      <Navbar.Brand href="#home">Translate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Text-Speech</Nav.Link>
          <Nav.Link href="#link">Speech-Text</Nav.Link>
          {
            // <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            //   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            //   <NavDropdown.Item href="#action/3.2">
            //     Another action
            //   </NavDropdown.Item>
            //   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            //   <NavDropdown.Divider />
            //   <NavDropdown.Item href="#action/3.4">
            //     Separated link809
            //   </NavDropdown.Item>
            // </NavDropdown>
          }
        </Nav>
        {
          //   <Form inline>
          //   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          //   <Button variant="outline-success">Search</Button>
          // </Form>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
