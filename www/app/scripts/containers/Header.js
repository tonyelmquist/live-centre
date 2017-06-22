import React, {Component} from 'react';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeNavMenuIndex, toggleMenu, showMenu, hideMenu} from '../actions/navigation';
import {searchKeyword, toggleSearch, closeSearch, emptySearch} from '../actions/search.js';
import MediaQuery from 'react-responsive';
//Routing
import {withRouter} from 'react-router';
//Menu components
import HeaderMenu from './../components/navigation/HeaderMenu';
import TabMenu from './../components/navigation/TabMenu';
import ExpandableMenu from './../components/navigation/ExpandableMenu';
//Shared icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import TVicon from 'material-ui/svg-icons/hardware/tv';
import ChannelIcon from 'material-ui/svg-icons/action/language';
import VideoIcon from 'material-ui/svg-icons/AV/videocam';
import VideoLibrary from 'material-ui/svg-icons/AV/video-library';

/* This component is the starting point for all navigation. 
 * There are three different navigation components (located in components/navigation)
 * * Tabs: Which is shown on screens < less than 900px. Has a menu item.
 * * The tabs menu item opens an expandable menu. 
 * * HeaderMenu: the top navigation, it contains searchbar and logo. It also displays navigation and categories at >1000 px screen. 
 * * * The searchbar either expands from left or from right, depending on screen size.
 * * * Clicking the search field fires an action that activates the search overlay. See searchoverlay container. 
 */

class Header extends Component {
  
  //Generate menu items that correspons with the react router paths.
  getPageItems = () => {
    const items = [
      {key: "route_home", path: "/Home", icon: <HomeIcon/>}, 
      {key: "route_series", path:"/Series", icon: <VideoIcon/>},
      {key: "route_channels", path: "/Channels", icon: <ChannelIcon/>},
      {key: "route_tvguide", path:"/TVGuide", icon:<TVicon/>}
    ];

    return items;
  }

  categoryItems = () => {
    const items = [];
    if(this.props.categories.items.length>0){
      for(let i=0; i<this.props.categories.items.length; i++){
        const name = this.props.categories.items[i].name;
        const id = this.props.categories.items[i].id;
        items.push({key: name, path: `/Category/${id}`});
      }
    }
    return items;
  }

  changeRoute = (path) => this.props.history.push(path);

  openCloseMenu = () => {
    this.props.dispatch(toggleMenu());
  }
  openCloseSearch = () => {
    this.props.dispatch(emptySearch());
    this.props.dispatch(toggleSearch());
  }
  hideMenu = () =>{
    this.props.dispatch(hideMenu());
  }
  //Force close when changing menu tab. Also empty the search ?? 
  closeSearch = () => {
    this.props.dispatch(emptySearch());
    this.props.dispatch(closeSearch());
  }

  handleSearch = (event) => {
    const keyword = event.target.value;
    if(keyword.length>0){
      this.props.dispatch(searchKeyword(event.target.value));
    }
     if(keyword.length<=0){
      this.props.dispatch(emptySearch());
    }
  }

  emptySearch = () => {
    this.props.dispatch(emptySearch());
  }

  isMenuOpen = () => {
    return this.props.menuIsOpen;
  }

 /* searchState = () => {
    return this.props.search;
  }
*/
  //Dont know if this is the best way to get the pathname. but it sure is the easiest.. 
  getLocationName = () => {
    const pathname = this.props.history.location.pathname;
    
    if(this.isSubPage()){
      const pathSegments = pathname.split("/");
      return pathSegments[pathSegments.length-1];
    }
    return pathname.replace("/", "");

  }

  // all the subpages, eg. Category/Program master. They have two slashes in the pathname. 
  isSubPage = () => {
    
    const pathname = this.props.history.location.pathname;
    const pathSegments = pathname.split("/");
    const noOfSlashes = pathSegments.length - 1;

    if(noOfSlashes > 1){
      return true;
    } 
    return false;
  }


  render(){

    return(
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
    menuIsOpen: PropTypes.bool,
    history: PropTypes.object,
    categories: PropTypes.object,
    search: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        menuIsOpen : state.headerMenuState,
        categories: state.tags,
        search: state.search
    };
};

export default withRouter(connect(mapStateToProps)(Header));
