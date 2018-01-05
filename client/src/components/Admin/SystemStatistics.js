import React, { Component } from "react";
import { Dimmer, Loader, Segment, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./styles.css";

class SystemStatistics extends Component {
  componentDidMount() {
    this.props.fetchSystemStatistics();
  }

  render() {
    const { statistics } = this.props;
    return (
      <Segment padded="very" style={{ minHeight: "80vh" }}>
        {statistics === null ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Card.Group itemsPerRow={3}>
            <Card className="user">
              <Card.Content>
                <Card.Header className="statisticTitle">
                  Total Account
                </Card.Header>
                <Card.Description>
                  <span className="letter" data-letter={statistics.totalUser}>
                    {statistics.totalUser}
                  </span>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className="trans">
              <Card.Content>
                <Card.Header className="statisticTitle">
                  Transactions
                </Card.Header>
                <Card.Description>
                  <span
                    className="letter"
                    data-letter={statistics.totalTransaction}
                  >
                    {statistics.totalTransaction}
                  </span>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className="balance">
              <Card.Content>
                <Card.Header className="statisticTitle">
                  System Balance
                </Card.Header>
                <Card.Description>
                  <span
                    className="letter"
                    data-letter={statistics.systemBalance}
                  >
                    {statistics.systemBalance}
                  </span>
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        )}
      </Segment>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ statistics: adminReducer.systemStatistics }),
  actions
)(SystemStatistics);
