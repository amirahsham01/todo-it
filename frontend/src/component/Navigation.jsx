import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Navigation({ user, logout }) {
    return (
        <Navbar variant="light" style={{background:'#7f69fb'}} className="navbar py-0">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ml-3">
                { user ? (
                        <>
                        <Nav.Link href="/home"><i className="fa fa-home home-link"></i></Nav.Link>
                        <input placeholder="Find" className="search-field"/>
                        </>
                    ) : ''}
                </Nav>
                <Nav className="ml-auto mr-5">
                    { user ? (
                        <>
                        <Nav.Link href="#user">
                        {user.username}
                        </Nav.Link>
                        <Link to="/logout" onClick={logout} className="nav-link">
                        Logout
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link to="/login" className="nav-link">
                          Login
                        </Link>
                        <Link to="/register" className="nav-link">
                          Sign Up
                        </Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;