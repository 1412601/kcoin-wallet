import React, { Component } from "react";
import {
  Button,
  Form,
  Modal,
  Dropdown,
  Input,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

class InitTransaction extends Component {
  state = { showModal: false, options: [], amount: 0, loading: false };

  componentDidMount() {
    this.forceUpdate();
    this.props.fetchAllUsersInformation();
  }

  componentWillReceiveProps(nextProps) {
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

  handleSubmit = async () => {
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
        this.props.getWallet();
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

  validInput() {
    const { selectUser, amount } = this.state;
    const valid = selectUser !== undefined && amount !== 0;
    if (!valid) {
      this.setState({ error: true });
    }
    return valid;
  }
  render() {
    const {
      showModal,
      options,
      selectUser,
      amount,
      loading,
      error
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
          />
        }
        open={showModal}
        size="small"
      >
        <Modal.Header>Make a transaction</Modal.Header>
        <Message negative hidden={!error}>
          <Message.Header>
            Please choose user to transfer coin & valid input value
          </Message.Header>
        </Message>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Select user</label>
                <Dropdown
                  selection
                  fluid
                  options={options}
                  name="selectUser"
                  value={selectUser}
                  error={error}
                  onChange={this.handleChangeForm}
                />
              </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <Input
                  name="amount"
                  value={amount}
                  type="number"
                  label={{ basic: true, content: "KCoin" }}
                  labelPosition="right"
                  error={error}
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
