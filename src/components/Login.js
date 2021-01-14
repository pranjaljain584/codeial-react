import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthState, login, startLogin } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState()) ;
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.emailInputRef);
    // console.log(this.passInputRef);

    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(startLogin());
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress , isLoggedIn } = this.props.auth;

    if(isLoggedIn){
      return <Redirect to="/" />
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
          ></input>
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passInputRef}
            onChange={this.handlePassChange}
            value={this.state.password}
          ></input>
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Loggin In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Log In</button>
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

export default connect(mapStateToProps)(Login);
