import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
// import FontIcon from 'material-ui/FontIcon';
import Face from 'material-ui/svg-icons/action/face';
import Toggle from 'material-ui/Toggle';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import {white, deepPurple500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
//Custom components
import Login from './Login';
import Logged from './Logged';
// import Sidebar from './Sidebar';
import BottomNavMenu from './BottomNav';
import MainFrame from './MainFrame';

//Actions
import {showSidebar, hideSidebar} from '../actions/sidebar';
class App extends Component {

    handleSidebar = () => {
        if (!this.props.sidebarState) {
            this.props.dispatch(showSidebar());
        } else {
            this.props.dispatch(hideSidebar());
        }
    }

    render() {
        const appbarStyle = {margin: 5};
        const headerStyle={textAlign: "center"};
        return (
            <div>
                <AppBar title="Live Centre" style={headerStyle}
                    iconElementLeft={<Avatar icon={<Face color={white}/>} color={white} backgroundColor={deepPurple500} style={appbarStyle} />}
                    iconElementRight={this.props.loginState ? <Logged/> : <Login/>}
                />
                <MainFrame />
                <BottomNavMenu id = 'bottomNav'/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn,
        sidebarState: state.isSidebarVisible
    };
};

export default connect(mapStateToProps)(App);
