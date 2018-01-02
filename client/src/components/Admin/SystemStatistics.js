import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SystemStatistics extends Component {
  componentDidMount() {
    this.props.fetchSystemStatistics();
  }

  render() {
    const statistics = this.props.statistics || {
      totalUser: 0,
      totalTransaction: 0,
      systemBalance: 0
    };
    return (
      <Message
        header="System Statistics"
        list={[
          "Total Users: " + statistics.totalUser,
          "Total Transactions: " + statistics.totalTransaction,
          "System Balance: " + statistics.systemBalance
        ]}
      />
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ statistics: adminReducer.systemStatistics }),
  actions
)(SystemStatistics);
