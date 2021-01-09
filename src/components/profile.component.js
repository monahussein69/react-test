import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>

        <p>
          <strong>Role:</strong> {currentUser.role}
        </p>

        <strong>Stores:</strong>
        <ul>
          {currentUser.stores &&
            currentUser.stores.map((store, index) => (
              <li key={index}>{store}</li>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
