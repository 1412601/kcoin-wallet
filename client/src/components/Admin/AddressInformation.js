import React, { Component } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AddressInformation extends Component {
  componentDidMount() {
    this.props.fetchAllAddressesInformation();
  }

  render() {
    const { addresses } = this.props;
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Addresses</Table.HeaderCell>
            <Table.HeaderCell>User Email</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {addresses.length !== 0
            ? addresses.map(({ address, _user }, index) => (
                <Table.Row>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{address}</Table.Cell>
                  <Table.Cell>{_user.email}</Table.Cell>
                  <Table.Cell>{_user.balance}</Table.Cell>
                </Table.Row>
              ))
            : null}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="left chevron" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="right chevron" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ addresses: adminReducer.addressesInformation }),
  actions
)(AddressInformation);
