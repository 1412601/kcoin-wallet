import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";

const enumType = {
  0: "info",
  1: "success",
  2: "error"
};

class AppMessage extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== -1) {
      setTimeout(() => {
        this.props.resetMessage();
      }, 8000);
    }
  }

  render() {
    const { message, type } = this.props;
    return (
      <Message
        hidden={type === -1}
        info={enumType[type] === "info"}
        error={enumType[type] === "error"}
        success={enumType[type] === "success"}
      >
        <Message.Header>{message}</Message.Header>
      </Message>
    );
  }
}

export default connect(
  ({ messageReducer }) => ({
    message: messageReducer.message,
    type: messageReducer.type
  }),
  actions
)(AppMessage);
