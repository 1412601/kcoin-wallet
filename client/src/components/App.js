import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import * as action from "../actions";

import Home from "./Home";
import HeaderApp from "./Header";
import Admin from "./Admin";

const LandingPage = () => (
  <div style={{ textAlign: "center" }}>
    <Header as="h2" icon textAlign="center">
      <Header.Content>Welcome to Kcoin wallet</Header.Content>
    </Header>
    <div>Login to continue</div>
  </div>
);

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Container>
          <HeaderApp />
          <Route
            exact
            path="/"
            component={auth === null ? LandingPage : Home}
          />
          <Route exact path="/admin" component={Admin} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }), action)(
  App
);
