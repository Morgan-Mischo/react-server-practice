
import React, { Component } from 'react';
import { login } from '../redux/writerReducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginWriter = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    let { username, password } = this.state;
    let { writer } = this.props;
    if (writer.loggedIn) return <Redirect to="/" />;
    return (
      <div className="display-container">
        <div className="box-medium">
          <div className="input-row">
            Username:{' '}
            <input
              type="text"
              value={username}
              name="username"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-row">
            Password:{' '}
            <input
              type="password"
              value={password}
              name="password"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <button onClick={this.loginWriter} className="btn normal-btn">
            Login
          </button>
        </div>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.writer;
}

export default connect(
  mapStateToProps,
  { login }
)(Login);