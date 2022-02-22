import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios.post(`https://honeypotflix.herokuapp.com/login`, {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(error => {
          console.log(error, 'no such user');
        });
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-md-center">

        <Col xs lg="5">
          <Card className="login text-center">
            <Card.Header>Log in to your honeypotflix account</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formUsername">
                  <Form.Label></Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formPassword">
                  <Form.Label></Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <div className="mt-3">
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                  <Link to="/register">
                    <Button className="ml-4" variant="secondary">Register</Button>
                  </Link>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};