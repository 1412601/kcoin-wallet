import React, { Component } from "react";
import {
  Segment,
  Menu,
  Container,
  Image,
  Button,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  state = {};

  renderContent() {
    return this.props.auth === null ? (
      <Menu.Item>
        {/* <Button color="google plus" as="a" href="/auth/google">
          <Icon name="google plus" /> Login with Google
        </Button> */}
        <a className="ui google plus button" href="/auth/google">
          Login with google
        </a>
      </Menu.Item>
    ) : (
      [
        <Menu.Item key={1}>
          <div>Email: {this.props.auth.email}</div>
        </Menu.Item>,
        <Menu.Item key={2}>
          <Button primary as="a" href="/api/logout">
            Logout
          </Button>
        </Menu.Item>
      ]
    );
  }

  render() {
    return (
      <Segment stackable="true">
        <Menu inverted pointing color="teal">
          <Container>
            <Menu.Item header>
              <Link to="/">
                <Image
                  size="mini"
                  src="https://i.pinimg.com/originals/34/45/9f/34459f5c0a02012bbe64cf602e430427.jpg"
                  style={{ marginRight: "1.5em", width: 30, height: 30 }}
                />
                Kcoin Wallet
              </Link>
            </Menu.Item>
            <Menu.Menu position="right">{this.renderContent()}</Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }))(Header);
