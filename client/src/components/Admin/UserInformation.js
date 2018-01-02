import React, { Component } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class UserInformation extends Component {
  componentDidMount() {
    this.props.fetchAllUsersInformation();
  }

  render() {
    const { users } = this.props;
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.length !== 0
            ? users.map(({ email, balance }, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell>{balance}</Table.Cell>
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
  ({ adminReducer }) => ({ users: adminReducer.usersInformation }),
  actions
)(UserInformation);
