import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

// Import React Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col className="justify-content-center" sm={10} style={{ margin: '32px' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>

      <Row xs={1} md={2} className="justify-content-center m-2">
        {filteredMovies.map((m) => (
          <Col md={4} lg={3} sm={6} xs={6} className="mb-4" key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default connect(mapStateToProps)(MoviesList);
