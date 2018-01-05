import React, { Component } from "react";
import { Table, Segment, Loader, Dimmer, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import Modal2FA from "../Modal2FA";

class Init extends Component {
  componentDidMount() {
    this.props.getInitTransaction();
  }

  render() {
    const { init } = this.props;
    return (
      <div className="myTable">
        {init === null ? (
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
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {init.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan="3">There is no transaction</Table.Cell>
                </Table.Row>
              ) : (
                init.map(
                  (
                    {
                      _id,
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
                      <Table.Cell>{to}</Table.Cell>
                      <Table.Cell>{value} Kcoin</Table.Cell>
                      <Table.Cell>
                        <Button.Group>
                          <Modal2FA confirm id={_id} />
                          <Button.Or />
                          <Modal2FA id={_id} />
                        </Button.Group>
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

export default connect(({ userReducer }) => ({ init: userReducer.init }))(Init);
