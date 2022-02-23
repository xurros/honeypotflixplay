import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      <Link to={`/movies/${movie._id}`}>
        <Card className="m-1">
          <Card.Img variant="top" src={movie.ImagePath} />
          <div className="card__overlay">
            <div class="card__header">

              <div className="card__header-text">
                <Card.Title style={{ backgroundColor: "transparent" }}>
                  {movie.Title}
                </Card.Title>
                <span class="card__genre">{movie.Genre.Name}</span>
              </div>
            </div>

            <Card.Text class="card__description">{movie.Description}</Card.Text>
            <Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button class="card__description" variant="link" style={{ fontSize: "14px", textDecoration: "none" }}>
                  more
                </Button>
              </Link>
            </Card.Text>
          </div>
        </Card>
      </Link>
    );
  }
}
// Prop-types
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};








//       <Card style={{ width: '12rem' }}>
//         <Card.Img variant="top" src={movie.ImagePath} />
//         <Card.Body>
//           <Link to={`/movies/${movie._id}`}>

//             <Card.Title>{movie.Title}</Card.Title>
//           </Link >
//           <Card.Text class="card__genre">{movie.Genre.Name}</Card.Text>


//           <Card.Text class="text-justify card__description">{movie.Description}</Card.Text>
//           <Link to={`/movies/${movie._id}`}>

//           </Link >

//         </Card.Body>
//       </Card>
//     );
//   }
// }


