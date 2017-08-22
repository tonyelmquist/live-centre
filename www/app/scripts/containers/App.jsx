import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter, Route } from 'react-router';
//import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
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
import NotificationManager from './NotificationManager';
//Components
import TransitionRoutes from '../components/TransitionRoutes';
import SportPlayerOverlay from '../components/SportSection/SportPlayerOverlay';
import LoginModal from '../components/Modals/LoginModal';
//Actions
import { setLandscape, setPortrait } from '../actions/settings';
import { closeTeamMemberOverlay } from '../actions/pages/sportsPage';
import { showLoginModal } from '../actions/modals';
import { newNotification, removeNotification } from '../actions/notifications';
import { setDisplayName } from '../actions/authentication';
import Authentication from '../utils/Authentication';

//const history = createHistory();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModal: {
                error: false,
            },
        };

        window.addEventListener('resize', () => {
            this.dispatchOrientation();
        }, false);
        
        window.addEventListener('load', () => {
            this.dispatchOrientation();
        });

        // window.addEventListener('keydown', (e) => {
        //     console.log(e.keyCode);

        //     if (e.shiftKey && e.keyCode === 81) {
        //         console.log('notification');
        //         this.props.dispatch(newNotification('This is a success message!', 5, 'success'));
        //     }
        //     if (e.shiftKey && e.keyCode === 87) {
        //         console.log('notification');
        //         this.props.dispatch(newNotification('Your login details were incorrect!', 7, 'error'));
        //     }
        // });
    }

    dispatchOrientation = () => {
        setTimeout(() => {
            if (window.innerWidth < window.innerHeight) {
                this.props.dispatch(setPortrait());
            }

            if (window.innerWidth > window.innerHeight) {
                this.props.dispatch(setLandscape());
            }
        }, 0);
    }

    closeTeamMemberOverlay = () => {
        this.props.dispatch(closeTeamMemberOverlay());
    }

    closeLoginModal = () => {
        this.props.dispatch(showLoginModal(false));
    }

    loginAttempt = (username, password) => {
        Authentication.signInAttempt(username, password, (success, e) => {
            console.log(success, '?');
            if (success) {
                this.props.dispatch(newNotification('Welcome back, user!', 7, 'success'));
                this.closeLoginModal();
                this.setState({
                    loginModal: {
                        error: false,
                    },
                });
            } else {
                this.props.dispatch(newNotification(e.errorMessage, 7, 'error'));
                this.setState({
                    loginModal: {
                        error: true,
                    },
                });
            }
        });
    }

    dispatchRemoveNotification = (id) => {
        this.props.dispatch(removeNotification(id));
    };

    render() {
        const ProfilePageWithProps = () => (
            <ProfilePage
                user={this.props.authentication.user}
                setDisplayName={(name) => this.props.dispatch(setDisplayName(name))}
            />);

        return (
          <MemoryRouter history={history}>
            <div>
              <Header />
              <div className="main" id="main">
                <SearchOverlay />
                {this.props.teamMemberOverlay.isOpen ? <SportPlayerOverlay closeTeamMemberOverlay={this.closeTeamMemberOverlay} teamMember={this.props.teamMemberOverlay.player} /> : <div />}
                    <TransitionRoutes>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/programs" component={ProgramsPage} />
                        <Route path="/channels" component={ChannelsPage} />
                        <Route path="/sports" component={SportsPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/category/:categoryKey" component={CategoryContainer} />
                        <Route path="/channel/:channelKey" component={SingleChannelPage} />
                        <Route path="/sport/:sportKey" component={SingleSportPage} />
                        <Route path="/team/:teamKey" component={TeamPage} />
                        <Route path="/profile" component={ProfilePageWithProps} />
                        <Route path="/watchlist" component={WishlistPage} />
                    </TransitionRoutes>

                <OverlayX />
              </div>
              <LoginModal isOpen={this.props.modals.showLoginModal} onClose={this.closeLoginModal} onSubmit={this.loginAttempt} error={this.state.loginModal.error}/>
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
};
const mapStateToProps = state => ({
    notifications: state.notifications.notifications,
    loginState: state.isUserLoggedIn,
    sidebarState: state.isSidebarVisible,
    modals: state.modals,
    authentication: state.authentication,
    teamMemberOverlay: state.sportsPage.sportPlayerOverlay,
});

export default connect(mapStateToProps)(App);
