import React, { Component } from "react";
import { Message, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SystemStatistics extends Component {
  componentDidMount() {
    this.props.fetchSystemStatistics();
  }

  render() {
    const { statistics } = this.props;
    return (
      <div>
        {statistics === null ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Message
            positive
            size="big"
            header="System Statistics"
            list={[
              "Total Users: " + statistics.totalUser,
              "Total Transactions: " + statistics.totalTransaction,
              "System Balance: " + statistics.systemBalance + " KCoins"
            ]}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ statistics: adminReducer.systemStatistics }),
  actions
)(SystemStatistics);
