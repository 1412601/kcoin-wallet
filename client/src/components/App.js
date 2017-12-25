import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./Home";

const Header = () => <h1>This is header</h1>;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container text>
          <Header />
          <Route exact path="/" component={Home} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
