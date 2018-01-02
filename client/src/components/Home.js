import React, { Component } from "react";
import { Grid, Segment, Menu, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";

import GeneralInfo from "./GeneralInfo";
import Transactions from "./Transactions/index";
class Home extends Component {
  state = {
    showQR: false,
    activeItem: "General",
    content: {
      General: <GeneralInfo />,
      Transactions: <Transactions />
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
      <Segment padded clearing>
        <Grid>
          <Grid.Column width={4}>{this.renderMenu()}</Grid.Column>
          <Grid.Column width={12}>{this.state.currentContent}</Grid.Column>
        </Grid>
        <Button
          circular
          icon="plus"
          size="massive"
          floated="right"
          color="teal"
          style={{ margin: 10 }}
        />
      </Segment>
    );
  }
}

export default connect(() => ({}), actions)(Home);
