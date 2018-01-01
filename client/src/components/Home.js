import React, { Component } from "react";
import {
  Grid,
  Form,
  Header,
  Container,
  Button,
  Segment,
  Popup,
  Label,
  Menu
} from "semantic-ui-react";
import QRCode from "qrcode.react";
import { connect } from "react-redux";
import * as actions from "../actions";
class Home extends Component {
  state = { showQR: false };
  componentDidMount() {
    this.props.getWallet();
  }

  renderMenu() {
    return (
      <Menu fluid vertical>
        <Menu.Item>
          <Menu.Header>Your account</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="General information"
              // active={activeItem === "Profile"}
              // onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Transactions"
              // active={activeItem === "Profile"}
              // onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Menu"
              // active={activeItem === "Profile"}
              // onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const user = this.props.user || {
      balance: 0,
      availableBalance: 0,
      address: ""
    };
    const { showQR } = this.state;
    return (
      <Container padded="very">
        <Grid>
          <Grid.Column width={4}>{this.renderMenu()}</Grid.Column>
          <Grid.Column width={12}>
            <Segment padded="very" style={{ height: "80vh" }}>
              <Form>
                <Form.Group>
                  <Form.Field
                    width={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start"
                    }}
                  >
                    <Header size="medium" textAlign="center">
                      Balance
                    </Header>
                  </Form.Field>
                  <Form.Field width={11}>
                    <Popup
                      trigger={
                        <Label as="a" color="green" size="big">
                          {user.balance} KCoin
                        </Label>
                      }
                      content="Number of Kcoin that currently own"
                      position="right center"
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field
                    width={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start"
                    }}
                  >
                    <Header size="medium" textAlign="center">
                      Available balance
                    </Header>
                  </Form.Field>
                  <Form.Field width={11}>
                    <Popup
                      trigger={
                        <Label as="a" color="yellow" size="big">
                          {user.availableBalance} KCoin
                        </Label>
                      }
                      content="Number of Kcoin that available to use"
                      position="right center"
                    />
                  </Form.Field>
                </Form.Group>
                <Header size="medium">Address [{user.address}]</Header>
                <Button
                  primary
                  onClick={() => this.setState({ showQR: !showQR })}
                >
                  {showQR ? "Hide" : "Show"} QRcode
                </Button>
                {this.state.showQR ? (
                  <div style={{ textAlign: "center", margin: 10 }}>
                    <QRCode value={user.address} size={350} />
                  </div>
                ) : null}
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect(({ userReducer }) => ({ user: userReducer }), actions)(
  Home
);
