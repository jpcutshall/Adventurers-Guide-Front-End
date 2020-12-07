import React from "react"
import {Link} from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"
import {Navbar, Form, Nav, NavDropdown} from 'react-bootstrap'

export default function Header() {
	return (
		<Navbar bg="light" expand="lg">
		  <Navbar.Brand href="/">Adventurers Guide</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link href="/">Home</Nav.Link>
		      <NavDropdown title="Tags" id="basic-nav-dropdown">

		      </NavDropdown>
		    </Nav>
		    <Form inline>
		      <AuthOptions />
		    </Form>
		  </Navbar.Collapse>
		</Navbar>
	)
}
