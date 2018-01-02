import React, { Component } from "react";
import { Grid, Container, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";

import GeneralInfo from "./GeneralInfo";
class Home extends Component {
  state = {
    showQR: false,
    activeItem: "General",
    content: {
      General: <GeneralInfo />
    }
  };

  componentWillMount() {
    this.setState({ currentContent: this.state.content.General });
  }

  componentDidMount() {
    this.props.getWallet();
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      currentContent: this.state.content[name]
    });
  };

  renderMenu() {
    const { activeItem } = this.state;
    return (
      <Menu fluid vertical pointing>
        <Menu.Item>
          <Menu.Header>Your account</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="General"
              active={activeItem === "General"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Transactions"
              active={activeItem === "Transactions"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="sendKcoin"
              active={activeItem === "sendKcoin"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Container padded="very">
        <Grid>
          <Grid.Column width={4}>{this.renderMenu()}</Grid.Column>
          <Grid.Column width={12}>{this.state.currentContent}</Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect(({}) => ({}), actions)(Home);
