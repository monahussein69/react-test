import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

import { getAdminUsers } from "../../actions/admin";

class AdminUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props
      .dispatch(getAdminUsers())
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: true });
      });
  }

  render() {
    const { user: currentUser, adminUsers } = this.props;
    const { loading } = this.state;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Subscribed Users</strong>
          </h3>
        </header>
        {loading ? (
          <div>Loading .......</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers && !adminUsers.length ? (
                <tr>
                  <td colSpan={3}>No records added</td>
                </tr>
              ) : (
                adminUsers &&
                adminUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { adminUsers } = state.admin;
  return {
    user,
    adminUsers
  };
}

export default connect(mapStateToProps)(AdminUsers);
