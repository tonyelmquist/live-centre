import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter, Route } from 'react-router';
// Actions
// import {*} from '../actions/**';
// import Avatar from 'material-ui/Avatar';
// Custom components
import Login from './Login';
// import Logged from './Logged';
import Header from './Header';

// Pages
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import FavoritePage from './pages/FavoritePage';
import ProgramsPage from './pages/ProgramsPage';
import ChannelsPage from './pages/ChannelsPage';
import SingleChannelPage from './pages/SingleChannelPage';
import ProfilePage from './pages/ProfilePage';
import SportsMainPage from './pages/SportsMainPage';
import SingleSportPage from './pages/SingleSportPage';
import SportsTeamPage from './pages/SportsTeamPage';
import Overlay from './OverlayContainer';
import OverlayX from './OverlayX';
import CategoryContainer from './CategoryContainer';
import SearchOverlay from './SearchOverlay';
import { setLandscape, setPortrait } from '../actions/settings';

// import { TransitionMotion, spring, presets } from 'react-motion';

// import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// import createHistory from 'history/createMemoryHistory';
// const history = createHistory();


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.dispatchOrientation();
        if ('onorientationchange' in window) {
            window.addEventListener("orientationchange", () => {
                this.dispatchOrientation();
            }, false);
        } else {
          window.addEventListener("resize", () => {
                this.dispatchOrientation();
            }, false);
        }
    }

    dispatchOrientation = () => {
        const self = this;
        setTimeout(function() {
            if (screen.width < screen.height) {
                self.props.dispatch(setPortrait())
            }

            if (screen.width > screen.height) {
                self.props.dispatch(setLandscape())
            }
        }, 100);
    }
    render() {
        return (
          <MemoryRouter initialEntries={['/Home']}>
            <div>
              <Header />
              <div className="main" id="main">
                {/* this.props.state_all.search.isOpen ? <SearchContainer/>  : <div></div>*/}

                 {/*{this.props.state_all.overlay.isVisible ? <Overlay /> : <div /> }*/}
                <SearchOverlay />
                <div className="mainContent" id="mainContent">
                  <Route exact path="/Home" component={HomePage} />
                  <Route path="/Login" component={Login} />
                  <Route path="/Settings" component={SettingsPage} />
                  <Route path="/Favorites" component={FavoritePage} />
                  <Route path="/Category/:categoryKey" component={CategoryContainer} />
                  <Route path="/Channels" component={ChannelsPage} />
                  <Route path="/Channel/:channelKey" component={SingleChannelPage}/>
                  <Route path="/Programs" component={ProgramsPage} />
                  <Route path="/Sports" component={SportsMainPage} />
                  <Route path="/Sport/:sportKey" component={SingleSportPage} />
                  <Route path="/Team/:teamKey" component={SportsTeamPage} />
                  <Route path="/Profile" component={ProfilePage} />
                </div>

                <OverlayX />
              </div>

            </div>
          </MemoryRouter>

        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // loginState: PropTypes.bool,
    // sidebarState: PropTypes.bool,
    state_all: PropTypes.any.isRequired,
};
const mapStateToProps = state => ({
    loginState: state.isUserLoggedIn,
    sidebarState: state.isSidebarVisible,
    state_all: state,
});

export default connect(mapStateToProps)(App);
