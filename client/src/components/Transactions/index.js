import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import "./styles.css";

import Send from "./Send";
import Receive from "./Receive";

const panes = [
  {
    menuItem: "Send",
    render: props => (
      <Tab.Pane attached={false}>
        <Send {...props.functions} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Receive",
    render: props => (
      <Tab.Pane attached={false}>
        <Receive {...props.functions} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Initial",
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
  },
  {
    menuItem: "Pending",
    render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>
  }
];

class Transactions extends Component {
  render() {
    const {
      getSendTransaction,
      getReceiveTransaction,
      getInitTransaction,
      getPendingTransaction
    } = this.props;
    return (
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        functions={{
          getSendTransaction,
          getReceiveTransaction,
          getInitTransaction,
          getPendingTransaction
        }}
      />
    );
  }
}

export default connect(() => ({}), actions)(Transactions);
