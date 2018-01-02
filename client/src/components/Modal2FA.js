import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Image,
  Input,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import twoFactor from "node-2fa";
import axios from "axios";

class ModalConfirm extends Component {
  state = { showModal: false, showMessage: false };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, showMessage: false });
  };
  handleSubmit = () => {
    const { twoFactor: key } = this.props.auth;
    const verify = twoFactor.verifyToken(key.secret, this.state.number);
    if (!verify || verify.delta !== 0) {
      this.setState({ showMessage: true, number: "" });
    } else {
      this.handleConfirm();
    }
  };

  async handleConfirm() {
    const { confirm, id } = this.props;
    try {
      const { data } = confirm
        ? await axios.get(`/api/sendTransactions/${id}`)
        : await axios.delete(`/api/transaction/${id}`);

      console.log("DATA", data);
      this.setState({ showModal: false });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { confirm, auth } = this.props;
    const { showModal, showMessage, number } = this.state;
    return (
      <Modal
        trigger={
          confirm ? (
            <Button
              icon
              color="green"
              onClick={() => this.setState({ showModal: true })}
            >
              <Icon name="checkmark" size="large" />
            </Button>
          ) : (
            <Button
              icon
              secondary
              onClick={() => this.setState({ showModal: true })}
            >
              <Icon name="cancel" size="large" />
            </Button>
          )
        }
        open={showModal}
        size="small"
        dimmer="blurring"
        closeOnEscape
        closeOnRootNodeClick={false}
      >
        <Header
          content={confirm ? "Confirm transaction" : "Cancel transaction"}
        />
        <Message negative hidden={!showMessage}>
          <Message.Header>Wrong token!</Message.Header>
        </Message>
        <Modal.Content
          image
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            src={auth.twoFactor.qr}
            size="medium"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
          <Input
            size="large"
            type="number"
            action
            placeholder="6 digit number"
            value={number}
            name="number"
            onChange={this.handleChange}
          >
            <input />
            <Button onClick={this.handleSubmit}>Check</Button>
          </Input>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => this.setState({ showModal: false })}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }))(
  ModalConfirm
);
