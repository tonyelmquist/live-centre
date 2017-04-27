import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {loginSuccess} from '../actions/login';

// const Login = (props) => (
//
// );

class Login extends Component {
  static muiName = 'FlatButton';
  handleLogin = () => {
      this.props.dispatch(loginSuccess());
  }
  render() {
    return (
        <FlatButton style= {this.props.style} label="Login" onTouchTap={this.handleLogin}/>
    );
  }
}

Login.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    style:React.PropTypes.object,
    loginState:React.PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn
    };
};


export default connect(mapStateToProps)(Login);
