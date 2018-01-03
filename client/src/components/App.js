import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import * as action from "../actions";

import Home from "./Home";
import HeaderApp from "./Header";
import Admin from "./Admin";
import LandingPage from "./Landing";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <HeaderApp />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={Admin} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(() => ({}), action)(App);
