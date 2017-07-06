import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// Shared icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import TVicon from 'material-ui/svg-icons/hardware/tv';
import ChannelIcon from 'material-ui/svg-icons/action/language';
import VideoIcon from 'material-ui/svg-icons/AV/videocam';
import { toggleMenu, hideMenu } from '../actions/navigation';
// Menu components
import HeaderMenu from './../components/navigation/HeaderMenu';
import TabMenu from './../components/navigation/TabMenu';
import ExpandableMenu from './../components/navigation/ExpandableMenu';
import { searchKeyword, toggleSearch, closeSearch, emptySearch } from '../actions/search';
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
    // Generate menu items that correspons with the react router paths.
    getPageItems = () => {
        const items = [
      { key: 'route_home', path: '/Home', icon: <HomeIcon /> },
      { key: 'route_series', path: '/Series', icon: <VideoIcon /> },
      { key: 'route_channels', path: '/Channels', icon: <ChannelIcon /> },
      { key: 'route_tvguide', path: '/TVGuide', icon: <TVicon /> },
        ];

        return items;
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

    handleSearch = (event) => {
        const keyword = event.target.value;
        if (keyword.length > 0) {
            this.props.dispatch(searchKeyword(event.target.value));
        }
        if (keyword.length <= 0) {
            this.props.dispatch(emptySearch());
        }
    }

    emptySearch = () => {
        this.props.dispatch(emptySearch());
    }

    isMenuOpen = () => this.props.menuIsOpen

    changeRoute = path => this.props.history.push(path);


    categoryItems = () => {
        const items = [];
        if (this.props.tags) {
            for (const key in this.props.tags) {
                if (Object.prototype.hasOwnProperty.call(this.props.tags, key)) {
                    const name = this.props.tags[key].name;
                    items.push({ key: name, path: `/Category/${name}` });
                }
            }
        }
        return items;
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

    render() {
        return (
          <div id="header-container">
            <HeaderMenu
              pageItems={this.getPageItems()}
              categoryItems={this.categoryItems()}
              openCloseMenu={this.openCloseMenu}
              isMenuOpen={this.isMenuOpen}
              locationName={this.getLocationName()}
              isSubPage={this.isSubPage()}
              changeRoute={this.changeRoute}
              openCloseSearch={this.openCloseSearch}
              handleSearch={this.handleSearch}
              searchState={this.props.search}
              settingsState={this.props.settings}
              closeSearch={this.closeSearch}
            />
            <TabMenu
              pageItems={this.getPageItems()}
              changeRoute={this.changeRoute}
              isMenuOpen={this.isMenuOpen}
              isSubPage={this.isSubPage()}
              openCloseMenu={this.openCloseMenu}
              closeSearch={this.closeSearch}
              hideMenu={this.hideMenu}
            />
            <ExpandableMenu
              categoryItems={this.categoryItems()}
              pageItems={this.getPageItems()}
              openCloseMenu={this.openCloseMenu}
              isMenuOpen={this.isMenuOpen}
              changeRoute={this.changeRoute}
              closeSearch={this.closeSearch}
            />
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
};

const mapStateToProps = state => ({
    menuIsOpen: state.headerMenuState,
    tags: state.tags.items,
    search: state.search,
    settings: state.settings,
});


export default withRouter(connect(mapStateToProps)(Header));
