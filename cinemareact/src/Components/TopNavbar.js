import React from 'react';
import {Container, Nav, Navbar, NavDropdown, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";

const TopNavbar = () => {
    return (

        <Navbar bg="light" expand="lg">

                <Container>
                    <Navbar.Brand className={"brandName"}>CINEMA CITY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/shows"}>Show</Nav.Link>
                            <Nav.Link as={Link} to={"/films"}>Movies</Nav.Link>
                                                </Nav>
                    </Navbar.Collapse>
                </Container>

        </Navbar>
    );
};

export default TopNavbar;