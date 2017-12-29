import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import * as action from "../actions";

import Home from "./Home";
import Header from "./Header";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <Route exact path="/" component={Home} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(() => ({}), action)(App);
