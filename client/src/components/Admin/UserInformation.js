import React, { Component } from "react";
import { Icon, Menu, Table, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class UserInformation extends Component {
  state = {
    page: 1
  };
  componentDidMount() {
    this.props.fetchUsersPage(this.state.page);
  }

  handleItemClick = (e, { value }) => {
    this.setState({
      page: value
    });
    this.props.fetchUsersPage(value);
  };

  render() {
    const { users, numbOfPages, MAX_RECORDS } = this.props.users;
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
          {users.length !== 0 ? (
            users.map(({ email, balance }, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {(this.state.page - 1) * MAX_RECORDS + index + 1}
                </Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{balance} KCoins</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          )}
        </Table.Body>
        <Table.Footer>
          {numbOfPages > 1 ? (
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="left chevron" />
                  </Menu.Item>
                  {new Array(numbOfPages).fill(1).map((_, index) => (
                    <Menu.Item
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
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ users: adminReducer.usersPage }),
  actions
)(UserInformation);
