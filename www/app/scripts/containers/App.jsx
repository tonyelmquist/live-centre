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
import LoginModal from '../components/Modals/LoginModal';
//Actions
import { setLandscape, setPortrait } from '../actions/settings';
import { closeTeamMemberOverlay } from '../actions/pages/sportsPage';
import { showLoginModal } from '../actions/modals';
import Authentication from '../utils/Authentication';


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

    closeLoginModal = () => {
        this.props.dispatch(showLoginModal(false));
    }

    loginAttempt = (username, password) => {
        const auth = new Authentication();
        auth.signInAttempt(username, password);
        this.closeLoginModal();
    }

    render() {
        const ProfilePageWithProps = () => (
            <ProfilePage
                user={this.props.authentication.user}
            />);

        return (
          <MemoryRouter initialEntries={['/Home']}>
            <div>
              <Header />
              <div className="main" id="main">
                <SearchOverlay />
                {this.props.teamMemberOverlay.isOpen ? <SportPlayerOverlay closeTeamMemberOverlay={this.closeTeamMemberOverlay} teamMember={this.props.teamMemberOverlay.player} /> : <div />}

                    <TransitionRoutes>
                        <Route exact path="/Home" component={HomePage} />
                        <Route path="/Programs" component={ProgramsPage} />
                        <Route path="/Channels" component={ChannelsPage} />
                        <Route path="/Sports" component={SportsPage} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Settings" component={SettingsPage} />
                        <Route path="/Category/:categoryKey" component={CategoryContainer} />
                        <Route path="/Channel/:channelKey" component={SingleChannelPage} />
                        <Route path="/Sport/:sportKey" component={SingleSportPage} />
                        <Route path="/Team/:teamKey" component={TeamPage} />
                        <Route path="/Profile" component={ProfilePageWithProps} />
                        <Route path="/Wishlist" component={WishlistPage} />
                    </TransitionRoutes>

                <OverlayX />
              </div>
              <LoginModal isOpen={this.props.modals.showLoginModal} onClose={this.closeLoginModal} onSubmit={this.loginAttempt} />
            </div>
          </MemoryRouter>

        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    modals: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    loginState: state.isUserLoggedIn,
    sidebarState: state.isSidebarVisible,
    modals: state.modals,
    authentication: state.authentication,
    teamMemberOverlay: state.sportsPage.sportPlayerOverlay,
});

export default connect(mapStateToProps)(App);
