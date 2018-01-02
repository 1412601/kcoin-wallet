import React, { Component } from "react";
import { Table, Segment, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";

class Send extends Component {
  componentDidMount() {
    this.props.getSendTransaction();
  }

  render() {
    const { send } = this.props;
    return (
      <div>
        {send === null ? (
          <Segment style={{ height: "80vh" }}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>To user</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Transaction hash</Table.HeaderCell>
                <Table.HeaderCell>Transaction time</Table.HeaderCell>
                <Table.HeaderCell>Block hash</Table.HeaderCell>
                <Table.HeaderCell>Block time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {send.map(
                (
                  {
                    to,
                    value,
                    transHash,
                    transactionTimeStamp,
                    blockHash,
                    blockTimeStamp
                  },
                  index
                ) => (
                  <Table.Row>
                    <Table.Cell>{to}</Table.Cell>
                    <Table.Cell>{value} Kcoin</Table.Cell>
                    <Table.Cell>{transHash}</Table.Cell>
                    <Table.Cell>
                      {transactionTimeStamp.toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{blockHash}</Table.Cell>
                    <Table.Cell>
                      {blockTimeStamp.toLocaleDateString()}
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

export default connect(({ userReducer }) => ({ send: userReducer.send }))(Send);
