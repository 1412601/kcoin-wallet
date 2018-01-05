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
import axios from "axios";

class Header extends Component {
  state = {};

  renderContent() {
    return this.props.auth === null ? (
      <Menu.Item>
        <Button color="google plus" as="a" href="/auth/google">
          <Icon name="google plus" /> Login with Google
        </Button>
      </Menu.Item>
    ) : (
      [
        <Menu.Item key={0}>
          <Button color="red" onClick={this.handleGetCoin}>
            FREE KCoin <Icon name="bitcoin" />
          </Button>
        </Menu.Item>,
        <Menu.Item key={1}>
          <div>{this.props.auth.email}</div>
        </Menu.Item>,
        <Menu.Item key={2}>
          <Button primary as="a" href="/api/logout">
            Logout
          </Button>
        </Menu.Item>
      ]
    );
  }

  handleGetCoin = async () => {
    try {
      const { data } = await axios.get("/api/admin/getCoin");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Segment stackable="true">
        {this.props.admin ? (
          <Menu inverted pointing color="teal">
            <Container>
              <Menu.Item header>
                <Link to="/admin">
                  <Image
                    size="mini"
                    src="https://i.pinimg.com/originals/34/45/9f/34459f5c0a02012bbe64cf602e430427.jpg"
                    style={{ marginRight: "1.5em", width: 30, height: 30 }}
                  />
                  Kcoin Wallet
                </Link>
              </Menu.Item>
            </Container>
          </Menu>
        ) : (
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
        )}
      </Segment>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }))(Header);
