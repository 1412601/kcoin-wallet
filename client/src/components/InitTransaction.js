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

  handleSelectAddress = () => {
    alert("ABC");
  };

  handleRadio = (e, { value }) => {
    this.setState({ radio: value });
  };

  validInput() {
    const { selectUser, amount } = this.state;
    const empty = selectUser !== undefined && amount > 0;
    const valid = this.props.auth.balance >= amount;
    !empty
      ? this.setState({
          error: true,
          message: "Please choose user to transfer coin & valid input value"
        })
      : !valid
        ? this.setState({
            error: true,
            message: "Input must less then your balance"
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
      radio
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
                  name=""
                  width={11}
                  placeholder="Address outside system"
                  disabled={radio !== "address"}
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
  ({ adminReducer, authReducer }) => ({
    users: adminReducer.usersInformation,
    auth: authReducer
  }),
  actions
)(InitTransaction);
