import React, { Component } from "react";
import {
  Button,
  Header,
  Modal,
  Image,
  Input,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";
import twoFactor from "node-2fa";
import axios from "axios";

class ModalConfirm extends Component {
  state = { showModal: false, showMessage: false, loading: false };

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
    this.setState({ loading: true });
    try {
      const { data } = confirm
        ? await axios.get(`/api/sendTransactions/${id}`)
        : await axios.delete(`/api/transaction/${id}`);

      confirm ? this.props.confirmMessage() : this.props.cancelMessage();
      this.props.getInitTransaction();
      this.props.getWallet();
      console.log("DATA", data);
      this.setState({ showModal: false, loading: false });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { confirm, auth } = this.props;
    const { showModal, showMessage, number, loading } = this.state;
    return (
      <Modal
        trigger={
          confirm ? (
            <Button positive onClick={() => this.setState({ showModal: true })}>
              Confirm
            </Button>
          ) : (
            <Button onClick={() => this.setState({ showModal: true })}>
              Cancel
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
            <Button onClick={this.handleSubmit} loading={loading}>
              Check
            </Button>
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

export default connect(({ authReducer }) => ({ auth: authReducer }), actions)(
  ModalConfirm
);
