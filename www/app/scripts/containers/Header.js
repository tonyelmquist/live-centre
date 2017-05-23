import React from 'react';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeNavMenuIndex, toggleMenu, showMenu, hideMenu} from '../actions/navigation';

import MediaQuery from 'react-responsive';

//MaterialUI
import SearchBar from '../components/SearchBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';

//ICONS (material ui)
import HomeIcon from 'material-ui/svg-icons/action/home';
import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';

//Routing
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router';

//Should maybe be moved to component?
function MenuItem(props, history){
  return(
      <FlatButton
        onTouchTap={props.onClick}
        target="_blank"
        label={props.label}
        primary={true}
        icon={props.icon}
        className="menuItem"
        secondary={true}
        accessible={true}
        accessibilityLabel={'MenuItem'}
      />
  );
}

class Header extends React.Component {
    constructor(){
        super();

        // Wildcard in the categorykey, category/:categoryKey will be passed to the category route/component. 
        this.state = {
          menuItems : [
            { key: "/",
              label: "Home",
              icon:  <HomeIcon/> ,
            },
            {
              key: "/Category/Kategori1",
              label: "Kategori1",
            },
            {
              key: "/Category/Kategori2",
              label: "Kategori2",
            },
            {
              key: "/Category/Kategori3",
              label: "Kategori3",
            },
          ]
        };
/*
            {
              key: "/Settings",
              label: "Settings",
              icon: <SettingsIcon/>,
            },
            {
              key: "/Favorites",
              label: "Favorites",
              icon: <FavoriteIcon/>,
            },

*/


    };

    //Dispatch functions
    toggleMenu = () => {
      this.props.dispatch(toggleMenu());
    }
    hideMenu = () => {
      this.props.dispatch(hideMenu());
    }
    changeRoute = (path) => this.props.history.push(path);

    //Menu items for larger screens and mobile (< 600px screenwidth)
    getMenuItems = () => {

      return this.state.menuItems.map( (item)=> {
          return (
            <MenuItem
              label={item.label}
              icon={item.icon}
              key={item.key}
              onClick={() => this.changeRoute(item.key)}
            />);
      });
    }

    //Tabs for smaller screens
    getMenuTabs = () => {
      return this.state.menuItems.map( (item)=> {
          return (
            <Tab
              label={item.label}
              key={item.key}
              onClick={() => this.changeRoute(item.key)}
              accessible={true}
              accessibilityLabel={'Menu_Tab'}
            />);
      });
    }


    render(){
        return(
          <div>
            <div id="header">
          
                <Paper zDepth={1} className="header">
      
                  <MenuItem label="Live Centre" icon={<TempLogo/>} primary={true}/>
      
                  <MediaQuery minWidth={1200} className="inline"  >
      
                      { this.getMenuItems() }
                  </MediaQuery>
      
                  <MediaQuery maxWidth={600} className="inline"  >
      
                    <MenuItem label="Categories" icon={<MoreIcon/>} onClick={() => this.toggleMenu()}
                      accessible={true}
                      accessibilityLabel={'MenuItem_Categories'}
                    />
      
      
                  </MediaQuery>
      
                  <MediaQuery minWidth={640} className="floatRight paddingRight">
      
                    <SearchBar/>
                      <Logged />
      
                  </MediaQuery>
      
      
                </Paper>
      
                <MediaQuery minWidth={601} maxWidth={1200}>
                  <Tabs className="tabs">
                    {this.getMenuTabs()}
                  </Tabs>
                </MediaQuery>
      
                <MediaQuery query = '(max-width:600px)' className={this.props.menuIsOpen ? "fullscreen_menu" : ""} accessible={true}
                    accessibilityLabel={'fullscreen_menu'} onTouchTap={() => this.hideMenu()} >
                    { this.props.menuIsOpen ? this.getMenuItems() : console.log("MENU NOT VISIBLE") }
                </MediaQuery>
          
              </div>
          </div>
          


        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    visible:PropTypes.bool,
    menuIsOpen: PropTypes.bool,
    history: PropTypes.object
};
MenuItem.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        menuIsOpen : state.headerMenuState
    };
};

export default withRouter(connect(mapStateToProps)(Header));
