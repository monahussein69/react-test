import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { addAdminHelps, getRoles } from "../../actions/admin";

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

class AddAdminHelper extends Component {
  constructor(props) {
    super(props);
    this.handleAddHelper = this.handleAddHelper.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      role: "",
      successful: false
    };
  }

  componentDidMount() {
    this.props
      .dispatch(getRoles())
      .then(() => {})
      .catch(() => {});
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleAddHelper(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          addAdminHelps(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.role
          )
        )
        .then(() => {
          this.setState({
            successful: true,
            username: "",
            email: "",
            password: "",
            role: ""
          });

          this.form.hideError(this.usernameInput);
          this.form.hideError(this.emailInput);
          this.form.hideError(this.passwordInput);
          this.form.hideError(this.roleInput);
        })
        .catch(() => {
          this.setState({
            successful: false
          });
        });
    }
  }

  render() {
    const { user: currentUser, message, roles } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="col-md-12">
        <header className="jumbotron">
          <h3>
            <strong>Add Admin helper</strong>
          </h3>
        </header>
        <div style={{ width: "500px" }}>
          <Form
            onSubmit={this.handleAddHelper}
            ref={add => {
              this.form = add;
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
                  ref={c => {
                    this.usernameInput = c;
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  ref={c => {
                    this.emailInput = c;
                  }}
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
                  ref={c => {
                    this.passwordInput = c;
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <Select
                  name="role"
                  value={this.state.role}
                  onChange={this.onChangeRole}
                  validations={[required]}
                  className="form-control"
                  ref={c => {
                    this.roleInput = c;
                  }}
                >
                  <option value="">Choose helper role</option>
                  {roles &&
                    roles.map(role => (
                      <option value={role.name} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  <span>Add</span>
                </button>
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
              ref={add => {
                this.checkBtn = add;
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
  const { roles } = state.admin;
  const { user } = state.auth;

  return {
    message,
    user,
    roles
  };
}

export default connect(mapStateToProps)(AddAdminHelper);
