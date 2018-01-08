import React, { Component } from "react";
import { Table, Segment, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";

class Pending extends Component {
  componentDidMount() {
    this.props.getPendingTransaction();
  }
  render() {
    const { pending } = this.props;
    return (
      <div className="myTable">
        {pending === null ? (
          <Segment style={{ height: "60vh" }}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>To user</Table.HeaderCell>
                <Table.HeaderCell>Value </Table.HeaderCell>
                <Table.HeaderCell>Transaction hash</Table.HeaderCell>
                <Table.HeaderCell>Transaction time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pending.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="4">There is no transaction</Table.Cell>
                </Table.Row>
              ) : (
                pending.map(
                  (
                    { from, to, value, transHash, transactionTimeStamp },
                    index
                  ) => (
                    <Table.Row key={index}>
                      <Table.Cell>{from}</Table.Cell>
                      <Table.Cell>{value}Kcoin</Table.Cell>
                      <Table.Cell>{transHash.substring(0, 10)}...</Table.Cell>
                      <Table.Cell>
                        {new Date(transactionTimeStamp).toLocaleString()}
                      </Table.Cell>
                    </Table.Row>
                  )
                )
              )}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

export default connect(({ userReducer }) => ({ pending: userReducer.pending }))(
  Pending
);
