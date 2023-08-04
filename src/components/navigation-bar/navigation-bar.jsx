import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Log Out</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};