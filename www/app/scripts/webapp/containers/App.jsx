import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { MemoryRouter, Route, withRouter } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
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
import LoginPage from './pages/LoginPage';
// Containers
import VideoOverlay from './VideoOverlay';
import CategoryContainer from './CategoryContainer';
import SearchOverlay from './SearchOverlay';
import FixedLayer from './FixedLayer';
import NotificationManager from './NotificationManager';
// Components
import TransitionRoutes from '../components/TransitionRoutes';
import SportPlayerOverlay from '../components/SportSection/SportPlayerOverlay';
import SplashScreen from '../components/Common/SplashScreen';
// Actions
import { setLandscape, setPortrait } from '../../../../native/shared/actions/settings';
import { closeTeamMemberOverlay } from '../../../../native/shared/actions/pages/sportsPage';
import { removeNotification } from '../../../../native/shared/actions/notifications';
import { setDisplayName } from '../../../../native/shared/actions/authentication';
import { setSplashScreenReady } from '../../../../native/shared/actions/splashScreen';

// const history = createHistory();

class App extends Component {
    constructor(props) {
        super(props);

        window.addEventListener('resize', () => {
            this.dispatchOrientation();
        }, false);

        window.addEventListener('load', () => {
            setTimeout(()=> {
                this.dispatchOrientation();
                console.log('APP READY');
                this.props.dispatch(setSplashScreenReady(true));
            }, 2000);
        });
    }

    dispatchOrientation = () => {
        if (typeof window.orientation !== 'undefined') {
            if (window.orientation === 0) {
                this.props.dispatch(setPortrait());
            }

            if (window.orientation === -90 || window.orientation === 90) {
                this.props.dispatch(setLandscape());
            }
        } else {
            if (window.innerHeight > window.innerWidth) {
                this.props.dispatch(setPortrait());
            }

            if (window.innerHeight < window.innerWidth) {
                this.props.dispatch(setLandscape());
            }
        }
    }

    closeTeamMemberOverlay = () => {
        this.props.dispatch(closeTeamMemberOverlay());
    }

    dispatchRemoveNotification = (id) => {
        this.props.dispatch(removeNotification(id));
    };

    render() {
        const ProfilePageWithProps = () => (
            <ProfilePage
                user={this.props.authentication.user}
                setDisplayName={name => this.props.dispatch(setDisplayName(name))}
            />);

        return (
          <MemoryRouter history={history}>
            <div>
            <SplashScreen isReady={this.props.splashScreen.isReady} isShowing={this.props.splashScreen.isShowing} />
            <MediaQuery minWidth={1100}>
            <div style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: 9999, color: 'white', margin: '0 10', textAlign: 'center', backgroundColor: 'black' }}>
                <h1>IMR Media Center.</h1>
                <p>Not available for desktop yet.</p>
                <p>Please open the site on a smaller device.</p>
                <p>In chrome you can also display the site as a phone,
                    by right clicking and click inspect. <br />
                    Then choose a phone from the dropdown menu at the top. <br />
                    After inspecting you also need to refresh the page to remove the scrollbars.</p>
            </div>
            </MediaQuery>
              <FixedLayer />
              <div className={`main ${this.props.orientation}`} id="main">
                <SearchOverlay />
                {this.props.teamMemberOverlay.isOpen ? <SportPlayerOverlay closeTeamMemberOverlay={this.closeTeamMemberOverlay} teamMember={this.props.teamMemberOverlay.player} /> : <div />}
                    <TransitionRoutes>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/programs" component={ProgramsPage} />
                        <Route path="/channels" component={ChannelsPage} />
                        <Route path="/sports" component={SportsPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/category/:categoryKey" component={CategoryContainer} />
                        <Route path="/channel/:channelKey" component={SingleChannelPage} />
                        <Route path="/sport/:sportKey" component={SingleSportPage} />
                        <Route path="/team/:teamKey" component={TeamPage} />
                        <Route path="/profile" component={ProfilePageWithProps} />
                        <Route path="/watchlist" component={WishlistPage} />
                        <Route path="/login" component={LoginPage} />
                    </TransitionRoutes>

                <VideoOverlay />
              </div>
              
              <NotificationManager notifications={this.props.notifications} removeNotification={this.dispatchRemoveNotification} />
            </div>
          </MemoryRouter>

        );
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    modals: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    orientation: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
    notifications: state.notifications.notifications,
    splashScreen: state.splashScreen,
    loginState: state.isUserLoggedIn,
    sidebarState: state.isSidebarVisible,
    modals: state.modals,
    authentication: state.authentication,
    teamMemberOverlay: state.sportsPage.sportPlayerOverlay,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(App);
