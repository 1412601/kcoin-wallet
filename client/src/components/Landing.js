import React, { Component } from "react";
import { Header, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import * as action from "../actions";
import axios from "axios";

class Landing extends Component {
  state = {};

  componentDidMount() {
    if (this.props.auth !== null) {
      this.props.history.push("/home");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth !== null && nextProps.auth.isActivated) {
      this.props.history.push("/home");
    }
  }

  handleActivate = async () => {
    this.props.emailMessage();
    const { data } = await axios.get("/api/email/activate");
    console.log("SEND EMAILS", data);
  };

  render() {
    const { auth } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <Header as="h1" icon textAlign="center">
          <Header.Content>Welcome to Kcoin wallet</Header.Content>
        </Header>
        <div>
          {auth !== null ? (
            auth.isActivated ? (
              "Login to continue"
            ) : (
              <Button primary onClick={this.handleActivate}>
                Active account
              </Button>
            )
          ) : (
            "Login to continue"
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ authReducer }) => ({ auth: authReducer }), actions)(
  Landing
);
