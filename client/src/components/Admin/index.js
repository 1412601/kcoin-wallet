import React, { Component } from "react";
import {
  Grid,
  Container,
  Menu,
  Form,
  Segment,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
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
    },
    login: false
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

  handleChangeForm = (_, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    try {
      const { status, data } = await axios.post("/auth/admin", {
        username,
        password
      });
      console.log("ADMIN LOGIN", data);
      if (status === 200) {
        this.setState({ login: true });
      }
    } catch (error) {
      console.log(error);
    }
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
        {this.state.login ? (
          <Grid>
            <Grid.Column width={4}>{this.renderMenu()}</Grid.Column>
            <Grid.Column width={12}>{this.state.currentContent}</Grid.Column>
          </Grid>
        ) : (
          <div className="login-form" style={{ marginTop: 50 }}>
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="username"
                      onChange={this.handleChangeForm}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={this.handleChangeForm}
                    />

                    <Button
                      color="teal"
                      fluid
                      size="large"
                      onClick={this.handleLogin}
                    >
                      Login
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </Container>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ admin: adminReducer }),
  actions
)(Admin);
