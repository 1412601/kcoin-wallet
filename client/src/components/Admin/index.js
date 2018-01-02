import React, { Component } from "react";
import { Grid, Container, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import SystemStatistic from "./SystemStatistics";
import UserInformation from "./UserInformation";
import TransactionInformation from "./TransactionInformation";
import AddressInformation from "./AddressInformation";

class Admin extends Component {
  state = {
    activeItem: "Statistics",
    content: {
      Statistics: <SystemStatistic />,
      UsersInfo: <UserInformation />,
      TransInfo: <TransactionInformation />,
      AddressInfo: <AddressInformation />
    }
  };

  componentWillMount() {
    this.setState({ currentContent: this.state.content.Statistics });
  }

  handleItemClick = (e, { value }) => {
    this.setState({
      activeItem: value,
      currentContent: this.state.content[value]
    });
  };

  renderMenu() {
    const { activeItem } = this.state;
    return (
      <Menu fluid vertical>
        <Menu.Item>
          <Menu.Header>System Manager</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="System Statistics"
              value="Statistics"
              active={activeItem === "Statistics"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Users Information"
              value="UsersInfo"
              active={activeItem === "UsersInfo"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Transactions Information"
              value="TransInfo"
              active={activeItem === "TransInfo"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Addresses Information"
              value="AddressInfo"
              active={activeItem === "AddressInfo"}
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

export default connect(
  ({ adminReducer }) => ({ admin: adminReducer }),
  actions
)(Admin);
