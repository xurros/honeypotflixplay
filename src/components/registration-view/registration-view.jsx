import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr("Username required");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be at least 5 chars long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be at least 6 chars long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email required");
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail("Email must be valid");
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios.post("https://honeypotflix.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("Registration successful! Please login!");
          window.open("/", "_self");
        })
        .catch(response => {
          console.error(response);
          alert("Unable to register");
        });
    }
  };


  return (
    <Container>
      <Row className="d-flex justify-content-md-center">

        <Col xs lg="5">
          <Card className="login text-center">
            <Card.Header>Sign up for your honeypotflix account</Card.Header>
            <Card.Body>

              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>


                <Form.Group className="mb-2">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="8" placeholder="6 chars or more" />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                  {/* code added here to display validation error */}
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} style={{ "fontSize": "12px" }} placeholder="Enter birthday" />
                </Form.Group>



                <div className="mt-3">
                  <Button href="/" variant="primary">
                    Login
                  </Button>

                  <Link to="/register">
                    <Button className="ml-4" variant="secondary" type="submit" onClick={handleSubmit}>Register</Button>
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








//               <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </CardGroup>
//     </Col>
//   </Row>
//   </Container >
// );
// }

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};
