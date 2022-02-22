import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import "./director-view.scss";

export class DirectorView extends React.Component {

  render() {
    const { Director, onBackClick, movie } = this.props;

    return (
      <Container fluid>
        <Card className="director-card">
          <Card.Img
            variant="top"
            src={Director.ImagePath}
          />

          <Card.Body>

            <Card.Title className="director-card-title">
              {Director.Name}
            </Card.Title>

            <Card.Text className="director-card-text">
              Born: {Director.Birthdate}
            </Card.Text>

            <Card.Text className="director-card-text">
              {Director.Death}
            </Card.Text>

            <Card.Text className="director-card-text">{Director.Bio}</Card.Text>
            <Card.Footer className="director-card-footer">
              <Button
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};