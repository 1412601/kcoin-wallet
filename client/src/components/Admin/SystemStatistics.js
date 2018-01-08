import React, { Component } from "react";
import { Dimmer, Loader, Segment, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import SkewedContainer from "sc-react";
import * as actions from "../../actions";
import "./styles.css";

class SystemStatistics extends Component {
  componentDidMount() {
    this.props.fetchSystemStatistics();
  }

  render() {
    const { statistics } = this.props;
    return (
      <Segment style={{ minHeight: "80vh" }}>
        {statistics === null ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div>
            <SkewedContainer
              className="totaluser"
              bottom="right"
              bgColor="#ffffff"
              noMargin="true"
            >
              <Header className="statisticTitle" size="big">
                Total Users
              </Header>
              <span className="letter" data-letter={statistics.totalUser}>
                {statistics.totalUser}
              </span>
            </SkewedContainer>
            <SkewedContainer
              className="trans"
              top="left"
              bottom="left"
              bgColor="#ffffff"
              noMargin="true"
            >
              <Header className="statisticTitleRight" size="big">
                Total Transactions
              </Header>
              <div>
                <span
                  style={{ float: "right" }}
                  className="letter"
                  data-letter={statistics.totalTransaction}
                >
                  {statistics.totalTransaction}
                </span>
              </div>
            </SkewedContainer>
            <SkewedContainer
              className="balance"
              top="right"
              bgColor="#ffffff"
              noMargin="true"
            >
              <Header className="statisticTitle" size="large">
                Balance / Available Balance
              </Header>
              <span className="letter" data-letter={statistics.systemBalance}>
                {statistics.systemBalance} / {statistics.availableBalance}
              </span>
            </SkewedContainer>
          </div>
        )}
      </Segment>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ statistics: adminReducer.systemStatistics }),
  actions
)(SystemStatistics);
