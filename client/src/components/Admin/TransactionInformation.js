import React, { Component } from "react";
import {
  Icon,
  Menu,
  Table,
  Dimmer,
  Loader,
  Segment,
  Popup
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class TransactionInformation extends Component {
  state = { page: 1 };
  componentDidMount() {
    this.props.fetchTransactionPage(this.state.page);
  }

  handleItemClick = (e, { value }) => {
    this.setState({
      page: value
    });
    this.props.fetchTransactionPage(value);
  };

  render() {
    const { trans, numbOfPages, MAX_RECORDS } = this.props.trans;
    const statusString = {
      0: "Initialized",
      1: "Pending",
      2: "Completed"
    };
    return (
      <Segment style={{ minHeight: "80vh", overFlow: "auto" }}>
        <Dimmer active={trans.length === 0} inverted>
          <Loader />
        </Dimmer>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {trans.map(
              ({ from, to, value, status, transactionTimeStamp }, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {(this.state.page - 1) * MAX_RECORDS + index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      trigger={<label>{from.substring(0, 10)}</label>}
                      flowing
                      hoverable
                    >
                      {from}
                    </Popup>
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      trigger={<label>{to.substring(0, 10)}</label>}
                      flowing
                      hoverable
                    >
                      {to}
                    </Popup>
                  </Table.Cell>
                  <Table.Cell>{value} Kcoins</Table.Cell>
                  <Table.Cell>{statusString[status]}</Table.Cell>
                  <Table.Cell>
                    {new Date(transactionTimeStamp).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
          <Table.Footer>
            {numbOfPages > 1 ? (
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="left chevron" />
                    </Menu.Item>
                    {new Array(numbOfPages).fill(1).map((_, index) => (
                      <Menu.Item
                        key={index}
                        as="a"
                        value={index + 1}
                        onClick={this.handleItemClick}
                      >
                        {index + 1}
                      </Menu.Item>
                    ))}
                    <Menu.Item as="a" icon>
                      <Icon name="right chevron" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            ) : null}
          </Table.Footer>
        </Table>
      </Segment>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ trans: adminReducer.transInformation }),
  actions
)(TransactionInformation);
