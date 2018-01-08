import React, { Component } from "react";
import {
  Segment,
  Header,
  Message,
  Image,
  Input,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import twoFactor from "node-2fa";
import axios from "axios";
import * as actions from "../actions";

class Confirm extends Component {
  state = { showMessage: false, loading: false, message: "" };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, showMessage: false });
  };
  handleSubmit = () => {
    const { twoFactor: key } = this.props.auth;
    this.setState({ loading: true });
    const verify = twoFactor.verifyToken(key.secret, this.state.number);
    if (!verify || verify.delta !== 0) {
      this.setState({
        showMessage: true,
        number: "",
        loading: false,
        message: "Wrong token!"
      });
    } else {
      this.handleConfirm();
    }
  };

  async handleConfirm() {
    const { type, id } = this.props.match.params;
    try {
      const { data } =
        type === "confirm"
          ? await axios.get(`/api/sendTransactions/${id}`)
          : await axios.delete(`/api/transaction/${id}`);

      type === "confirm"
        ? this.props.confirmMessage()
        : this.props.cancelMessage();
      this.props.history.push("/home");
      console.log("DATA", data);
      this.setState({ showModal: false, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({
        showMessage: true,
        message: "Transaction is currently sending!"
      });
    }
  }
  render() {
    const { type } = this.props.match.params;
    const { auth } = this.props;
    const { showMessage, number, loading, message } = this.state;
    return (
      <Segment
        padded="very"
        style={{
          textAlign: "center"
        }}
      >
        <Message negative hidden={!showMessage}>
          <Message.Header>{message}</Message.Header>
        </Message>
        <div>
          <Header
            as="h1"
            content={
              type === "confirm" ? "Confirm transaction" : "Cancel transaction"
            }
          />
        </div>
        <Image
          src={auth !== null ? auth.twoFactor.qr : ""}
          size="medium"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "36%"
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
      </Segment>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }), actions)(
  Confirm
);
