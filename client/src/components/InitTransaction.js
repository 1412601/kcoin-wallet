import React, { Component } from "react";
import { Button, Form, Modal, Dropdown, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

class InitTransaction extends Component {
  state = { showModal: false, options: [], amount: 0 };

  componentDidMount() {
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
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { selectUser: toUser, amount: value } = this.state;
    try {
      const { data } = await axios.post("/api/initTransaction", {
        toUser,
        value
      });
      this.props.initMessage();
      this.props.getInitTransaction();
      console.log("DATA", data);
      this.setState({ showModal: false });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const { showModal, options, selectUser, amount } = this.state;
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
          <Button primary onClick={this.handleSubmit}>
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
