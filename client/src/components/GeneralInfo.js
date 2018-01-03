import React, { Component } from "react";
import {
  Segment,
  Form,
  Header,
  Popup,
  Label,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { connect } from "react-redux";

import QRCode from "qrcode.react";

class GeneralInfo extends Component {
  state = { showQR: true };
  render() {
    const { user } = this.props;
    const { showQR } = this.state;
    return (
      <Segment padded="very" style={{ minHeight: "80vh" }}>
        {user === null ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
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
            <Button primary onClick={() => this.setState({ showQR: !showQR })}>
              {showQR ? "Hide" : "Show"} QRcode
            </Button>
            {showQR ? (
              <div style={{ textAlign: "center", margin: 10 }}>
                <QRCode value={user.address} size={350} />
              </div>
            ) : null}
          </Form>
        )}
      </Segment>
    );
  }
}

export default connect(({ userReducer }) => ({
  user: userReducer.wallet
}))(GeneralInfo);
