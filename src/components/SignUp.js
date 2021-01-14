import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, startSignUp } from '../actions/auth';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmPassword: '',
      password: '',
      name: ''
    };
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleConfirmPassChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { email, password, name, confirmPassword } = this.state;

    if (
      email &&
      password &&
      name &&
      confirmPassword
    ) {
      this.props.dispatch(startSignUp());
      this.props.dispatch(signUp(email, password, confirmPassword, name));
    }
  };

  render() {
    const { error, inProgress } = this.props.auth;

    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={this.handleNameChange}
            value={this.state.name}
          ></input>
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          ></input>
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePassChange}
            value={this.state.password}
          ></input>
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={this.handleConfirmPassChange}
            value={this.state.confirmPassword}
          ></input>
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              signing Up...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Sign Up</button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SignUp);
