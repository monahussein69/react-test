import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Select from "react-validation/build/select";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { adminRegister, userRegister } from "../../actions/auth";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      userType: "",
      successful: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeUserType(e) {
    this.setState({
      userType: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    const { history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      if (this.state.userType === "user") {
        this.props
          .dispatch(
            userRegister(
              this.state.username,
              this.state.email,
              this.state.password
            )
          )
          .then(() => {
            history.push("/profile");
            window.location.reload();
            this.setState({
              successful: true
            });
          })
          .catch(() => {
            this.setState({
              successful: false
            });
          });
      } else if (this.state.userType === "admin") {
        this.props
          .dispatch(
            adminRegister(
              this.state.username,
              this.state.email,
              this.state.password
            )
          )
          .then(() => {
            console.log("test");
            history.push("/profile");
            window.location.reload();

            this.setState({
              successful: true
            });
          })
          .catch(() => {
            this.setState({
              successful: false
            });
          });
      }
    }
  }

  render() {
    const { message, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="user Type">User Type</label>
                <Select
                  name="userType"
                  value={this.state.userType}
                  onChange={this.onChangeUserType}
                  validations={[required]}
                  className="form-control"
                >
                  <option value="">Choose user type</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { isLoggedIn } = state.auth;

  return {
    message,
    isLoggedIn
  };
}

export default connect(mapStateToProps)(Register);
