import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Auth/login.component";
import Register from "./components/Auth/register.component";
import AddAdminHelper from "./components/Admin/addAdminHelper.component";
import AdminUsers from "./components/Admin/adminUsers.component";
import SubscribeToAdmin from "./components/User/SubscribeToAdmin";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showAdminBoard: false,
      showAdminsBoard: false,
      showUserBoard: false
    };

    history.listen(location => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.role === "user",
        showAdminBoard: user.role === "admin",
        showAdminsBoard:
          user.role === "admin" ||
          user.role === "sub-admin" ||
          user.role === "support" ||
          user.role === "manager"
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {
      currentUser,
      showAdminBoard,
      showAdminsBoard,
      showUserBoard
    } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Project
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showUserBoard && (
                <li className="nav-item">
                  <Link to={"/subscribe"} className="nav-link">
                    Subscribe
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/add-helper"} className="nav-link">
                    Add Helper
                  </Link>
                </li>
              )}

              {showAdminsBoard && (
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    users
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>

                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/add-helper" component={AddAdminHelper} />
              <Route exact path="/users" component={AdminUsers} />
              <Route exact path="/subscribe" component={SubscribeToAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
