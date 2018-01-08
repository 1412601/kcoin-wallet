import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import * as action from "../actions";

import Home from "./Home";
import HeaderApp from "./Header";
import Admin from "./Admin";
import Landing from "./Landing";
import Message from "./Message";

import socket from "../utils/socketHelper";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    socket.on("NEW", address => {
      console.log("NEW", address);
      this.props.newTrans(address);
    });
    socket.on("UPDATE", () => {
      console.log("UPDATE");
      this.props.getWallet();
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Route
            exact
            path="/"
            render={props => [
              <HeaderApp {...props} key={1} />,
              <Message key={3} />,
              <Landing {...props} key={2} />
            ]}
          />
          <Route
            exact
            path="/home"
            render={props => [
              <HeaderApp {...props} key={1} />,
              <Message key={3} />,
              <Home {...props} key={2} />
            ]}
          />
          <Route
            exact
            path="/admin"
            render={props => [
              <HeaderApp {...props} key={1} admin />,
              <Admin {...props} key={2} />
            ]}
          />
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(() => ({}), action)(App);
