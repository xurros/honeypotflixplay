import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// Import actions
// #0
import { setMovies, setUser } from "../../actions/actions";

import MoviesList from '../movies-list/movies-list';
//#1 The rest of components import statements but without the MovieCard's 
// because it will be imported and used in the MoviesList component rather than in here. 
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavbarView } from '../navbar-view/navbar-view';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./main-view.scss";

//#2 export keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();
    // #3 movies state removed from here 
    this.state = {
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }


  getMovies(token) {
    axios.get(`https://honeypotflix.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log("setMovies: ", response.data);
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    window.open("/", "_self");

  }


  // Set user
  setUser(user) {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    //#5 movies is extracted from this.props rather than from the this.state
    const { user } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">

            {/* For main view */}
            <Route exact path="/" render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies} />;
            }}
            />

            {/* For login view */}
            <Route path="/login" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            }} />

            {/* For registration view */}
            <Route path="/register" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }} />

            {/* For movie card */}
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              if (movies.length === 0) {
                return <div className="main-view" />;
              }
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            {/* For profile view */}
            <Route path="/profile" render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            {/* For genre view */}
            <Route
              path="/genres/:Name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      movies={movies}
                      Genre={
                        movies.find((m) => m.Genre.Name === match.params.Name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* For director view */}
            <Route
              path="/directors/:Name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      Director={
                        movies.find(
                          (m) => m.Director.Name === match.params.Name
                        ).Director
                      }
                      movies={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

          </Row>
        </Container>
      </Router>
    );
  }
}

//#7
let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

//#8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);