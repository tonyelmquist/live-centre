import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Actions
// import {*} from '../actions/**';
//Material UI
import AppBar from 'material-ui/AppBar';
import Face from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import {white, deepPurple500} from 'material-ui/styles/colors';

//Custom components
import MainFrame from './MainFrame';
import Login from './Login';
import Logged from './Logged';
import BottomNavMenu from './BottomNav';


class App extends Component {

    render() {
        // console.log(this.props.state_all);
        const appbarStyle = {position: "fixed", textAlign: "center"};
        return (
            <div>
                <AppBar title="Live Centre" style={appbarStyle}
                    iconElementLeft={<Avatar icon={<Face color={white}/>} color={white} backgroundColor={deepPurple500} style={appbarStyle} />}
                    iconElementRight={this.props.loginState ? <Logged/> : <Login/>}
                />
                <MainFrame />
                <BottomNavMenu id = 'bottomNav'/>
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
