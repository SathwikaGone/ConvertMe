import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="headerH">
      <Navbar.Brand>
        <b>ConvertMe</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "5px",
            }}
          >
            Text-Speech
          </Link>
          <Link
            to="/Speech-Text"
            style={{ textDecoration: "none", color: "black" }}
          >
            Speech-Text
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
