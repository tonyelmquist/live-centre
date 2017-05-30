import React, {Component} from 'react';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeNavMenuIndex, toggleMenu, showMenu, hideMenu} from '../actions/navigation';

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


/* Three different menu items. 
 * Tabs: Each of the categories, 
 * NormalMenu: contains searchbar, logo and categories
 * ExpandableMenu: Displays categories when toggled */
class Header extends Component {
  
  //Generate menu items that correspons with the react router paths.
  pageItems = () => {
    const items = [
      {key: "Home", path: "/Home", icon: <HomeIcon/>}, 
      {key: "Settings", path: "/Settings", icon: <SettingsIcon/>},
      {key: "Favorites", path: "/Favorites", icon: <FavoriteIcon/>}
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
    console.log(this.props.history);
    if(this.isSubPage()){
      this.props.history.goBack();
    } else {
      this.props.dispatch(toggleMenu());
    }
  }

  isMenuOpen = () => {
    return this.props.menuIsOpen;
  }

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
            pageItems={this.pageItems()}
            categoryItems={this.categoryItems()}
            openCloseMenu={this.openCloseMenu}
            isMenuOpen={this.isMenuOpen}
            locationName={this.getLocationName()}
            isSubPage={this.isSubPage()}
            changeRoute={this.changeRoute}
          />
          <TabMenu
            pageItems={this.pageItems()}
            changeRoute={this.changeRoute}
          />
          <ExpandableMenu
            categoryItems={this.categoryItems()}
            pageItems={this.pageItems()}
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
    categories: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        menuIsOpen : state.headerMenuState,
        categories: state.videos.categories
    };
};

export default withRouter(connect(mapStateToProps)(Header));
