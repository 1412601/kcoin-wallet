import React, { Component } from "react";
import { Grid, Segment, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";

import GeneralInfo from "./GeneralInfo";
import Transactions from "./Transactions/index";
import InitTransaction from "./InitTransaction";
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
    if (this.props.auth === null || !this.props.auth.isActivated) {
      this.props.history.push("/");
    }
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
      <Menu fluid vertical pointing size="massive">
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
        <InitTransaction />
      </Segment>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }), actions)(
  Home
);
