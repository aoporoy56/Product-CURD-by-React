import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'

export default function Navbars() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container className=''>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='flex-grow-0'>
          <Nav>
            <Nav.Link href='/'>
              View
            </Nav.Link>
            <Nav.Link href="/create">
                Create
            </Nav.Link>
            {/* <Nav.Link href='/update'>
              Update
            </Nav.Link> */}
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/category-list" >
                View
              </NavDropdown.Item>
              <NavDropdown.Item href="/create-category">
                Create
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
