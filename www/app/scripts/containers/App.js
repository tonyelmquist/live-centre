import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Actions
// import {*} from '../actions/**';
//Material UI
import AppBar from 'material-ui/AppBar';
import Face from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';

//Custom components
import MainFrame from './MainFrame';
import Login from './Login';
import Logged from './Logged';
import Header from './Header';


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.loginState ? <MainFrame /> : <Login />}
            </div>
        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginState: PropTypes.bool,
    sidebarState: PropTypes.bool,
};
const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn,
        sidebarState: state.isSidebarVisible,
        state_all: state

    };
};

export default connect(mapStateToProps)(App);
