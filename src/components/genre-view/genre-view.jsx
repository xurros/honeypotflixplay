import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>{Genre.Name}</Card.Title>
            <Card.Text>{Genre.Description}</Card.Text>
            {/* <Card.Footer> */}
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
            {/* </Card.Footer> */}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};