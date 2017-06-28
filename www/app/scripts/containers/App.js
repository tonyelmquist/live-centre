import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Actions
// import {*} from '../actions/**';
import Avatar from 'material-ui/Avatar';
// Custom components
import Login from './Login';
import Logged from './Logged';
import Header from './Header';

// Pages
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import FavoritePage from './pages/FavoritePage';
import SeriesPage from './pages/SeriesPage';
import ChannelsPage from './pages/ChannelsPage';
import TVGuidePage from './pages/TVGuidePage';

import CategoryContainer from './CategoryContainer';
import SearchOverlay from './SearchOverlay';

import { TransitionMotion, spring, presets } from 'react-motion';

// import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { MemoryRouter, Route, Link } from 'react-router';

// import createHistory from 'history/createMemoryHistory';
// const history = createHistory();


class App extends Component {
    render() {
        return (
          <MemoryRouter initialEntries={['/Home']}>
            <div>
              <Header />
              <div className="main">
                {/* this.props.state_all.search.isOpen ? <SearchContainer/>  : <div></div>*/}
                <SearchOverlay />
                <div className="mainContent">
                  <Route exact path="/Home" component={HomePage} />
                  <Route path="/Login" component={Login} />
                  <Route path="/Settings" component={SettingsPage} />
                  <Route path="/Favorites" component={FavoritePage} />
                  {/* <Route path="/Category/:categoryKey" component={CategoryPage}/> */}
                  <Route path="/Category/:categoryKey" component={CategoryContainer} />
                  <Route path="/Channels" component={ChannelsPage} />
                  <Route path="/Series" component={SeriesPage} />
                  <Route path="/TVGuide" component={TVGuidePage} />
                </div>
              </div>

            </div>
          </MemoryRouter>

        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginState: PropTypes.bool,
    sidebarState: PropTypes.bool,
};
const mapStateToProps = state => ({
    loginState: state.isUserLoggedIn,
    sidebarState: state.isSidebarVisible,
    state_all: state,
});

export default connect(mapStateToProps)(App);
