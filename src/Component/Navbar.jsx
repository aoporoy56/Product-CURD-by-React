import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Navbars() {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container className=''>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='flex-grow-0'>
          <Nav>
            <Nav.Link onClick={()=> navigate("/")}>
              View
            </Nav.Link>
            <Nav.Link onClick={()=> navigate("/create")}>
                Create
            </Nav.Link>
            {/* <Nav.Link href='/update'>
              Update
            </Nav.Link> */}
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=> navigate("/category-list")} >
                View
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=> navigate("/create-category")}>
                Create
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
