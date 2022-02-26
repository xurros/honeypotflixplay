import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import React Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addFavoriteMovie() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .post(`https://honeypotflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        console.log(response);
        alert(`Added ${this.props.movie.Title} to your favorites!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Card className="movie-view-card">

          <Card.Header className="movie-carousel">

            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={movie.MovieCaps[0]}
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={movie.MovieCaps[1]}
                  alt="Second slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={movie.MovieCaps[2]}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Card.Header>

          <Card.Body>
            <Card.Text className="text-center">
              <h4>{movie.Title}</h4>
            </Card.Text>

            <Card.Text >
              Genre:{` `}
              <Link to={`/genres/${movie.Genre.Name}`} style={{ "color": "#567879" }}>
                {movie.Genre.Name}
              </Link>
            </Card.Text>

            <Card.Text>
              Director:{` `}
              <Link to={`/directors/${movie.Director.Name}`} style={{ "color": "#567879" }}>
                {movie.Director.Name}
              </Link>
            </Card.Text>

            <Card.Text>Description: {movie.LongDescription}</Card.Text>

            <Card.Footer>
              <Button
                className="movie-view-button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back to list
              </Button>
              {` `}
              <Button
                variant="outline-primary"
                className="btn-outline-primary"
                value={movie._id}
                onClick={(e) => this.addFavoriteMovie(e, movie)}
              >
                Add to Favorites
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
