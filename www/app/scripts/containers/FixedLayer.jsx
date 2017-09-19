import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Shade from '../components/common/Shade';
import UserMenu from './UserMenu';

// Shared icons
// import HomeIcon from 'material-ui/svg-icons/action/home';
// import TVicon from 'material-ui/svg-icons/hardware/tv';
// import ChannelIcon from 'material-ui/svg-icons/action/language';
// import VideoIcon from 'material-ui/svg-icons/AV/videocam';

import { toggleMenu, hideMenu, switchUserMenu, switchShade, pageTabGoBack, removePageTabIndex } from '../actions/navigation';

import { HomeIcon, ProgramsIcon, ChannelsIcon, SportIcon } from '../components/Icons/TabIcons';

// Menu components
import HeaderMenu from '../components/navigation/HeaderMenu';
import MobileMenu from '../components/navigation/MobileMenu';
import ExpandableMenu from './../components/navigation/ExpandableMenu';
import { searchKeyword, toggleSearch, closeSearch, emptySearch, focusedSearch, blurredSearch } from '../actions/search';
import { closeOverlayX } from '../actions/videoOverlay';
// import VideoLibrary from 'material-ui/svg-icons/AV/video-library';

/* This component is the starting point for all navigation.
 * There are three different navigation components (located in components/navigation)
 * * Tabs: Which is shown on screens < less than 900px. Has a menu item.
 * * The tabs menu item opens an expandable menu.
 * * HeaderMenu: the top navigation, it contains searchbar and logo.
 * * It also displays navigation and categories at >1000 px screen.
 * * * The searchbar either expands from left or from right, depending on screen size.
 * * * Clicking the search field fires an action that activates the search overlay.
 */

class Header extends Component {

    onMenuItemClick = (path, index) => {
        if (this.props.search.isOpen) { this.closeSearch(); }
        if (this.props.menuIsOpen) { this.hideMenu(); }
        this.changeRoute(path, index);
    }

    // Dont know if this is the best way to get the pathname. but it sure is the easiest..
    getLocationName = () => {
        const pathname = this.props.history.location.pathname;

        if (this.isSubPage()) {
            const pathSegments = pathname.split('/');
            return pathSegments[pathSegments.length - 1];
        }
        return pathname.replace('/', '');
    }

    goBack = () => {
        if (this.props.pageTabIndex.past.length === 0) {
            this.props.dispatch(removePageTabIndex());
            this.props.history.goBack();
        } else {
            this.props.dispatch(pageTabGoBack());
        }
    }

    // all the subpages, eg. Category/Program master. They have two slashes in the pathname.
    isSubPage = () => {
        const pathname = this.props.history.location.pathname;
        const pathSegments = pathname.split('/');
        const noOfSlashes = pathSegments.length - 1;

        if (noOfSlashes > 1) {
            return true;
        }
        return false;
    }

    openUserMenu = () => {
        this.props.dispatch(switchUserMenu(true));
        this.props.dispatch(switchShade(true));
    }

    closeUserMenu = () => {
        this.props.dispatch(switchUserMenu(false));
        this.props.dispatch(switchShade(false));
    }

    menuItems = [
        {
            key: 'home',
            onClick: () => this.onMenuItemClick('/', 0),
            icon: <HomeIcon /> },
        {
            key: 'programs',
            onClick: () => this.onMenuItemClick('/programs', 1),
            icon: <ProgramsIcon /> },
        {
            key: 'channels',
            onClick: () => this.onMenuItemClick('/channels', 3),
            icon: <ChannelsIcon /> },
        {
            key: 'sports',
            onClick: () => this.onMenuItemClick('/sports', 4),
            icon: <SportIcon /> },
    ];

    openCloseMenu = () => {
        this.props.dispatch(toggleMenu());
    }

    openCloseSearch = () => {
        this.props.dispatch(emptySearch());
        this.props.dispatch(toggleSearch());
    }

    hideMenu = () => {
        this.props.dispatch(hideMenu());
    }

    // Force close when changing menu tab. Also empty the search ??
    closeSearch = () => {
        this.props.dispatch(emptySearch());
        this.props.dispatch(closeSearch());
    }

    handleSearchFocus = (isFocused) => {
        if (isFocused) {
            this.props.dispatch(focusedSearch());
        } else {
            this.props.dispatch(blurredSearch());
        }
    }

    handleSearch = (event) => {
        const keyword = event.target.value;
        if (keyword.length > 0) {
            this.props.dispatch(searchKeyword(event.target.value));
        }
        if (keyword.length <= 0) {
            this.props.dispatch(emptySearch());
        }
    }

    isSearching = () => {
        this.props.dispatch(searchKeyword(event.target.value));
    }

    emptySearch = () => {
        this.props.dispatch(emptySearch());
    }

    isMenuOpen = () => this.props.menuIsOpen
    isDrawerMenuOpen = () => this.props.isDrawerMenuOpen


    // Tabindex is used to know which direction to swipe the screen
    changeRoute = (path, index) => {
        this.closeUserMenu();

        const tabIndex = index;
        this.props.history.push({ pathname: path, state: { tabIndex } });
    }

    categoryItems = () => {
        const items = [];
        if (this.props.tags) {
            for (const key in this.props.tags) {
                if (Object.prototype.hasOwnProperty.call(this.props.tags, key)) {
                    const name = this.props.tags[key].name;
                    items.push({ key: name, onClick: () => this.onMenuItemClick(`/Category/${name}`), path: `/Category/${name}` });
                }
            }
        }
        return items;
    }

    activeItem = 0;

    setActiveItem = () => {
        const location = this.props.location.state;
        if (typeof location !== 'undefined') {
            this.activeItem = this.props.location.state.tabIndex;
        }
        if (this.props.location.pathname === '/') {
            this.activeItem = 0;
        }
    }
    nativeBackAction = () => {
        const canGoBack = (this.props.history.length > 1);
        // Check if search or video overlay is open.
        if (this.props.menuIsOpen) {
            this.openCloseMenu();
            return 'false';
        } else if (this.props.search.isOpen) {
            this.openCloseSearch();
            return 'false';
        } else if (this.props.overlayX.open) {
            this.props.dispatch(closeOverlayX());
            return 'false';
        } else if (this.props.location.pathname !== '/') {
            this.props.history.goBack();
            return 'false';
        }
        return 'moveTaskToBack';
    }

    render() {
        this.setActiveItem();
        window.jsBridge = {};
        window.jsBridge.onBackPressed = () => this.nativeBackAction();
        return (
          <div id="fixed-layer">
            <Shade onoff={this.props.shade} onTouch={this.closeUserMenu} />
            <HeaderMenu
                pageItems={this.menuItems}
                categoryItems={this.categoryItems()}
                openCloseMenu={this.openCloseMenu}
                isMenuOpen={this.isMenuOpen}
                locationName={this.getLocationName()}
                isSubPage={this.isSubPage()}
                changeRoute={this.changeRoute}
                openCloseSearch={this.openCloseSearch}
                handleSearch={this.handleSearch}
                handleSearchFocus={this.handleSearchFocus}
                searchState={this.props.search}
                settingsState={this.props.settings}
                closeSearch={this.closeSearch}
                openUserMenu={this.openUserMenu}
                goBack={this.goBack}
            />
            <MobileMenu
                menuItems={this.menuItems}
                openCloseMenu={this.openCloseMenu}
                indicatorColor="rgb(144, 202, 249)"
                searchState={this.props.search}
                activeItem={this.activeItem}
                menuIsOpen={this.props.menuIsOpen}
            />
            <ExpandableMenu
                categoryItems={this.categoryItems()}
                pageItems={this.menuItems}
                openCloseMenu={this.openCloseMenu}
                isMenuOpen={this.isMenuOpen}
                changeRoute={this.changeRoute}
                closeSearch={this.closeSearch}
            />
            <UserMenu changeRoute={this.changeRoute} />
          </div>
        );
    }

}


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    menuIsOpen: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    shade: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    menuIsOpen: state.headerMenuState,
    tags: state.tags.items,
    search: state.search,
    settings: state.settings,
    isDrawerMenuOpen: state.drawerMenuState,
    overlayX: state.overlayX,
    pageTabIndex: state.pageTabIndex,
    shade: state.shade,
});


export default withRouter(connect(mapStateToProps)(Header));
