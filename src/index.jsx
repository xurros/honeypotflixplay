import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";

import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";


import moviesApp from "./reducers/reducers";
import MainView from "./components/main-view/main-view";

import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Container>
          <MainView />
        </Container>
      </Provider >
    );
  }
}

// Find the root of myFlix app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render myFlix app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
