import React, {Component} from 'react';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeNavMenuIndex, toggleMenu, showMenu, hideMenu} from '../actions/navigation';

import MediaQuery from 'react-responsive';

//Routing
import {NavLink, Link} from 'react-router-dom';
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
      items.push({key: category, path: '/Category/'+category});
    });
    return items;
  }

  changeRoute = (path) => this.props.history.push(path);

  openCloseMenu = () => {
   this.props.dispatch(toggleMenu());
  }

  isMenuOpen = () => {
    return this.props.menuIsOpen;
  }

  render(){
    this.categoryItems();

    return(
        <div id="header-container">
          <HeaderMenu
            pageItems={this.pageItems()}
            categoryItems={this.categoryItems()}
            openCloseMenu={this.openCloseMenu}
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
