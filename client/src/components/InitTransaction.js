import React, { Component } from "react";
import {
  Button,
  Form,
  Modal,
  Dropdown,
  Input,
  Message,
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

class InitTransaction extends Component {
  state = {
    showModal: false,
    options: [],
    amount: 0,
    loading: false,
    disable: false,
    message: "",
    radio: "user"
  };

  componentDidMount() {
    this.props.fetchAllUsersInformation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth !== null) {
      if (this.props.auth.balance === 0) {
        this.setState({ disable: true });
      }
    }
    if (nextProps.users.length !== 0) {
      const options = nextProps.users
        .map(({ _id, email }) => ({
          key: _id,
          value: _id,
          text: email
        }))
        .filter(({ text }) => text !== this.props.auth.email);
      this.setState({ options });
    }
  }

  handleChangeForm = (e, { name, value }) => {
    this.setState({ [name]: value, error: false });
  };

  handleSubmit = () => {
    this.state.radio === "user"
      ? this.handleSelectUser()
      : this.handleSelectAddress();
  };

  handleSelectUser = async () => {
    const { selectUser: toUser, amount: value } = this.state;
    if (this.validInput()) {
      this.setState({ loading: true });
      try {
        const { data } = await axios.post("/api/initTransaction", {
          toUser,
          value: parseInt(value, 10)
        });
        this.props.initMessage();
        this.props.getInitTransaction();
        console.log("DATA", data);
        this.setState({
          showModal: false,
          loading: false,
          options: [],
          amount: 0
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  handleSelectAddress = async () => {
    const { address: toUser, amount: value } = this.state;
    if (this.checkValidAddress(toUser)) {
      this.setState({ loading: true });
      try {
        const { data } = await axios.post("/api/initTransaction", {
          toUser,
          value: parseInt(value, 10)
        });
        this.props.initMessage();
        this.props.getInitTransaction();
        console.log("DATA", data);
        this.setState({
          showModal: false,
          loading: false,
          options: [],
          amount: 0
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setState({
        error: true,
        message: "Input address or value is NOT valid!"
      });
    }
  };

  checkValidAddress = address => {
    const { amount } = this.state;
    const { availableBalance } = this.props.wallet;
    return address !== undefined
      ? address.match(/([A-Fa-f0-9]{64})/) !== null &&
          amount > 0 &&
          availableBalance >= amount
      : false;
  };

  handleRadio = (e, { value }) => {
    this.setState({ radio: value });
  };

  validInput() {
    const { selectUser, amount } = this.state;
    const empty = selectUser !== undefined && amount > 0;
    const valid = this.props.wallet.availableBalance >= amount;
    console.log("AVAI", this.props.wallet.availableBalance);
    console.log("VALID", valid);
    !empty
      ? this.setState({
          error: true,
          message: "Please choose user to transfer coin & valid input value"
        })
      : !valid
        ? this.setState({
            error: true,
            message: "Input must less than your balance"
          })
        : null;

    return valid && empty;
  }
  render() {
    const {
      showModal,
      options,
      selectUser,
      amount,
      loading,
      message,
      error,
      disable,
      radio,
      address
    } = this.state;
    return (
      <Modal
        trigger={
          <Button
            circular
            icon="plus"
            size="massive"
            floated="right"
            color="teal"
            style={{ margin: 10 }}
            onClick={() => this.setState({ showModal: true })}
            disabled={disable}
          />
        }
        open={showModal}
        size="small"
      >
        <Modal.Header>Make a transaction</Modal.Header>
        <Message negative hidden={!error}>
          <Message.Header>{message}</Message.Header>
        </Message>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group>
                <Form.Field width={5}>
                  <Checkbox
                    label="Select user"
                    radio
                    value="user"
                    checked={radio === "user"}
                    onChange={this.handleRadio}
                  />
                </Form.Field>
                <Form.Field width={11}>
                  <Dropdown
                    selection
                    search
                    fluid
                    options={options}
                    name="selectUser"
                    value={selectUser}
                    onChange={this.handleChangeForm}
                    disabled={radio !== "user"}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={5}>
                  <Checkbox
                    label="Address"
                    radio
                    value="address"
                    checked={radio === "address"}
                    onChange={this.handleRadio}
                  />
                </Form.Field>
                <Form.Input
                  name="address"
                  width={11}
                  value={address}
                  placeholder="Address outside system"
                  disabled={radio !== "address"}
                  onChange={this.handleChangeForm}
                />
              </Form.Group>
              <Form.Field>
                <label>Amount</label>
                <Input
                  name="amount"
                  value={amount}
                  type="number"
                  label={{ basic: true, content: "KCoin" }}
                  labelPosition="right"
                  onChange={this.handleChangeForm}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => this.setState({ showModal: false })}>
            Cancel
          </Button>
          <Button primary onClick={this.handleSubmit} loading={loading}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  ({ adminReducer, authReducer, userReducer }) => ({
    users: adminReducer.usersInformation,
    auth: authReducer,
    wallet: userReducer.wallet
  }),
  actions
)(InitTransaction);
