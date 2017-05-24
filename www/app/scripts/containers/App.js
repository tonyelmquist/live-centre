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

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

//Pages
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import FavoritePage from './pages/FavoritePage';
import CategoryPage from './pages/CategoryPage';


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Header/>

                        <div className="main">
                            {this.props.loginState ? <Redirect to="/Home"/> : <Login />}
                            <Route exact path="/Home" component={HomePage}/>
                            <Route path="/Login" component={Login}/>
                            <Route path="/Settings" component={SettingsPage}/>
                            <Route path="/Favorites" component={FavoritePage}/>
                            <Route path="/Category/:categoryKey" component={CategoryPage}/>
                            <Route path="/Login" component={Login}/>
                        </div>
                    </div>

                    {/*<div>
                        
                        {this.props.loginState ? <MainFrame /> : <Login />}
                    </div>*/}
                </Router>
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
