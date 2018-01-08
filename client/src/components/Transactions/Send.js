import React, { Component } from "react";
import { Table, Segment, Loader, Dimmer, Popup } from "semantic-ui-react";
import { connect } from "react-redux";

class Send extends Component {
  componentDidMount() {
    this.props.getSendTransaction();
  }

  render() {
    const { send } = this.props;
    return (
      <div className="myTable">
        {send === null ? (
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
                <Table.HeaderCell>Block hash</Table.HeaderCell>
                <Table.HeaderCell>Block time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {send.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="6">There is no transaction</Table.Cell>
                </Table.Row>
              ) : (
                send.map(
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
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Popup
                          trigger={<label>{to.substring(0, 10)}</label>}
                          flowing
                          hoverable
                        >
                          {to}
                        </Popup>
                      </Table.Cell>
                      <Table.Cell>{value}Kcoin</Table.Cell>
                      <Table.Cell>{transHash.substring(0, 10)}...</Table.Cell>
                      <Table.Cell>
                        {new Date(transactionTimeStamp).toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>{blockHash.substring(0, 10)}...</Table.Cell>
                      <Table.Cell>
                        {new Date(blockTimeStamp).toLocaleString()}
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

export default connect(({ userReducer }) => ({ send: userReducer.send }))(Send);
