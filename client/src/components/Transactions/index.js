import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import "./styles.css";

import Send from "./Send";
import Receive from "./Receive";
import Pending from "./Pending";
import Init from "./Init";

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
    render: props => (
      <Tab.Pane attached={false}>
        <Init {...props.functions} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Pending",
    render: props => (
      <Tab.Pane attached={false}>
        <Pending {...props.functions} />
      </Tab.Pane>
    )
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
