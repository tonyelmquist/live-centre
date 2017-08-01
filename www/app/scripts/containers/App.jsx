import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter, Route } from 'react-router';
// Pages
import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import SettingsPage from './pages/SettingsPage';
import ProgramsPage from './pages/ProgramsPage';
import ChannelsPage from './pages/ChannelsPage';
import SingleChannelPage from './pages/SingleChannelPage';
import ProfilePage from './pages/ProfilePage';
import SportsPage from './pages/SportsPage';
import SingleSportPage from './pages/SingleSportPage';
import TeamPage from './pages/TeamPage';
//Containers
import OverlayX from './OverlayX';
import CategoryContainer from './CategoryContainer';
import SearchOverlay from './SearchOverlay';
import Login from './Login';
import Header from './Header';
//Components
import TransitionRoutes from '../components/TransitionRoutes';
import SportPlayerOverlay from '../components/SportSection/SportPlayerOverlay';
//Actions
import { setLandscape, setPortrait } from '../actions/settings';
import { closeTeamMemberOverlay } from '../actions/pages/sportsPage';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.dispatchOrientation();
        if ('onorientationchange' in window) {
            window.addEventListener('orientationchange', () => {
                this.dispatchOrientation();
            }, false);
        } else {
            window.addEventListener('resize', () => {
              this.dispatchOrientation();
          }, false);
        }
    }

    dispatchOrientation = () => {
        const self = this;
        setTimeout(() => {
            if (screen.width < screen.height) {
                self.props.dispatch(setPortrait());
            }

            if (screen.width > screen.height) {
                self.props.dispatch(setLandscape());
            }
        }, 100);
    }

    closeTeamMemberOverlay = () => {
        this.props.dispatch(closeTeamMemberOverlay());
    }

    render() {
        //const preventScroll = this.props.state_all.overlayX.open || this.props.state_all.search.isOpen;
        const teamMemberOverlay = this.props.state_all.sportsPage.sportPlayerOverlay;
        return (
          <MemoryRouter initialEntries={['/Home']}>
            <div>
              <Header />
              <div className="main" id="main">
                <SearchOverlay />
                {teamMemberOverlay.isOpen ? <SportPlayerOverlay closeTeamMemberOverlay={this.closeTeamMemberOverlay} teamMember={teamMemberOverlay.player} /> : <div />}

                    <TransitionRoutes>
                        <Route exact path="/Home" component={HomePage}/>
                        <Route path="/Programs" component={ProgramsPage} />
                        <Route path="/Channels" component={ChannelsPage} />
                        <Route path="/Sports" component={SportsPage} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Settings" component={SettingsPage} />
                        <Route path="/Category/:categoryKey" component={CategoryContainer} />
                        <Route path="/Channel/:channelKey" component={SingleChannelPage} />
                        <Route path="/Sport/:sportKey" component={SingleSportPage} />
                        <Route path="/Team/:teamKey" component={TeamPage} />
                        <Route path="/Profile" component={ProfilePage} />
                        <Route path="/Wishlist" component={WishlistPage} />

                    </TransitionRoutes>
                    

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