import React, {Component} from 'react';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeNavMenuIndex, toggleMenu, showMenu, hideMenu} from '../actions/navigation';
import {searchKeyword, toggleSearch, emptySearch} from '../actions/search.js';

import MediaQuery from 'react-responsive';

//Routing
import {withRouter} from 'react-router';

//Menu components
import HeaderMenu from './../components/header/HeaderMenu';
import TabMenu from './../components/header/TabMenu';
import ExpandableMenu from './../components/header/ExpandableMenu';

//Shared icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import TVicon from 'material-ui/svg-icons/hardware/tv';

import ChannelIcon from 'material-ui/svg-icons/action/language';
import VideoIcon from 'material-ui/svg-icons/AV/videocam';
import VideoLibrary from 'material-ui/svg-icons/AV/video-library';

/* Three different menu items. 
 * Tabs: Each of the categories, 
 * NormalMenu: contains searchbar, logo and categories
 * ExpandableMenu: Displays categories when toggled */
class Header extends Component {
  
  //Generate menu items that correspons with the react router paths.
  getPageItems = () => {
    const items = [
      {key: "Home", path: "/Home", icon: <HomeIcon/>}, 
      {key: "Programs", path:"/Favorites", icon: <VideoIcon/>},
      {key: "Channels", path: "/Favorites", icon: <ChannelIcon/>},
      {key: "TV-Guide", path:"/Favorites", icon:<TVicon/>}
    ];

    return items;
  }

  categoryItems = () => {
    const items = [];
    this.props.categories.forEach((category) =>{
      items.push({key: category, path: `/Category/${category}`});
    });
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
      return this.isSubPage();
    }
    return pathname.replace("/", "");

  }

  // all the subpages, eg. Category/Program master. They have two slashes in the pathname. 
  isSubPage = () => {
    
    const pathname = this.props.history.location.pathname;
    const pathSegments = pathname.split("/");
    const noOfSlashes = pathSegments.length - 1;

    if(noOfSlashes > 1){
      return pathSegments[pathSegments.length-1];
    } 
    return false;
  }


  render(){
    this.categoryItems();

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
          />
          <TabMenu
            pageItems={this.getPageItems()}
            changeRoute={this.changeRoute}
            isMenuOpen={this.isMenuOpen}
            isSubPage={this.isSubPage()}
            openCloseMenu={this.openCloseMenu}
          />
          <ExpandableMenu
            categoryItems={this.categoryItems()}
            pageItems={this.getPageItems()}
            openCloseMenu={this.openCloseMenu}
            isMenuOpen={this.isMenuOpen}
            changeRoute={this.changeRoute}
          />
        </div>
    );  
  }

}


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    menuIsOpen: PropTypes.bool,
    history: PropTypes.object,
    categories: PropTypes.array,
    search: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        menuIsOpen : state.headerMenuState,
        categories: state.videos.categories,
        search: state.search
    };
};

export default withRouter(connect(mapStateToProps)(Header));
