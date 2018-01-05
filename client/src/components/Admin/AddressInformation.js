import React, { Component } from "react";
import { Icon, Menu, Table, Dimmer, Loader, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AddressInformation extends Component {
  state = {
    page: 1
  };
  componentDidMount() {
    this.props.fetchAddressesPage(this.state.page);
  }

  handleItemClick = (e, { value }) => {
    this.setState({
      page: value
    });
    this.props.fetchAddressesPage(value);
  };

  render() {
    const { addresses, numbOfPages, MAX_RECORDS } = this.props.addresses;
    return (
      <Segment style={{ minHeight: "80vh", overFlow: "auto" }}>
        <Table celled striped size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Addresses</Table.HeaderCell>
              <Table.HeaderCell>User Email</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {addresses.length !== 0 ? (
              addresses.map(({ address, _user }, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {(this.state.page - 1) * MAX_RECORDS + index + 1}
                  </Table.Cell>
                  <Table.Cell>{address}</Table.Cell>
                  <Table.Cell>{_user.email}</Table.Cell>
                  <Table.Cell>{_user.balance} KCoins</Table.Cell>
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
                <Table.HeaderCell colSpan="6">
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
      </Segment>
    );
  }
}

export default connect(
  ({ adminReducer }) => ({ addresses: adminReducer.addressesInformation }),
  actions
)(AddressInformation);
