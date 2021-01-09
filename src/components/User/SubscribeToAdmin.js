import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Multiselect } from "multiselect-react-dropdown";
import CheckButton from "react-validation/build/button";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getAdmins } from "../../actions/admin";
import { subscribeToStore } from "../../actions/user";

class SubscribeToAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.resetValues = this.resetValues.bind(this);

    this.multiselectRef = React.createRef();

    this.state = {
      selectedAdmins: [],
      successful: false
    };
  }

  onSelect(selectedList) {
    this.setState({
      selectedAdmins: selectedList
    });
  }

  onRemove(selectedList) {
    console.log(selectedList);
    this.setState({
      selectedAdmins: selectedList
    });
  }

  componentDidMount() {
    this.props
      .dispatch(getAdmins())
      .then(() => {})
      .catch(() => {});
  }

  resetValues() {
    this.multiselectRef.current.resetSelectedValues();
  }

  handleSubscribe(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(subscribeToStore(this.state.selectedAdmins))
        .then(() => {
          this.setState({
            successful: true,
            selectedAdmins: []
          });

          this.resetValues();
        })
        .catch(() => {
          this.resetValues();
          this.setState({
            successful: false,
            selectedAdmins: []
          });
        });
    }
  }

  render() {
    const { user: currentUser, message, admins } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="col-md-12">
        <header className="jumbotron">
          <h3>
            <strong>Subscribe to Admin</strong>
          </h3>
        </header>
        <div style={{ width: "500px" }}>
          <Form
            onSubmit={this.handleSubscribe}
            ref={add => {
              this.form = add;
            }}
          >
            <div>
              <div className="form-group">
                <label htmlFor="username">Stores</label>
                <Multiselect
                  ref={this.multiselectRef}
                  options={admins} // Options to display in the dropdown
                  selectedValues={this.state.selectedAdmins} // Preselected value to persist in dropdown
                  onSelect={this.onSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="username" // Property name to display in the dropdown options
                />
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
  const { admins } = state.admin;
  const { user } = state.auth;

  return {
    message,
    user,
    admins
  };
}

export default connect(mapStateToProps)(SubscribeToAdmin);
