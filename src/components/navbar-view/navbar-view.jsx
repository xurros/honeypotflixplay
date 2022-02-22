import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "./navbar-view.scss";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" expand="lg" variant="light">
      <Container fluid>

        <Navbar.Brand id="logo">
          <Link to={`/`}>
            <img
              className="d-inline-block align-top"
              alt="Studio Ghibli Logo"
              src={require('../../img/logotext.svg')}
              width="65"
              height="auto"
            />{' '}
          </Link>
        </Navbar.Brand>
        <h5 id="main-title"> honeypotflix</h5>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <ul className="ms-auto">
            {isAuth() && (
              <Nav.Link href="/profile">{user}</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link onClick={() => {
                onLoggedOut()
              }}>Logout</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </ul>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}