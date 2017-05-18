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


//ICONS
import HomeIcon from 'material-ui/svg-icons/action/home';
import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';

//Should maybe be moved to component?
function MenuItem(props){
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

        //Categories and pages should be passed as a prop.
        this.state = {
          menuItems : [
            { key: 0,
              label: "Home",
              icon:  <HomeIcon/> ,
            },
            {
              key: 1,
              label: "Settings",
              icon: <SettingsIcon/>,
            },
            {
              key: 2,
              label: "Favorites",
              icon: <FavoriteIcon/>,
            },
            {
              key: 3,
              label: "Category 1",
            }
          ]
        };

    };

    //Dispatch functions
    toggleMenu = () => {
      this.props.dispatch(toggleMenu());
    }
    hideMenu = () => {
      this.props.dispatch(hideMenu());
    }

    //Menu items for larger screens and mobile (< 600px screenwidth)
    getMenuItems = () => {

      return this.state.menuItems.map(function(item) {
          return (
            <MenuItem
              label={item.label}
              icon={item.icon}
              key={item.key}
              onClick={() => this.select(item.key)}
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
              onClick={() => this.select(item.key)}
              accessible={true}
              accessibilityLabel={'Menu_Tab'}
            />);
      });
    }

    select = (index) => this.props.dispatch(changeNavMenuIndex(index));

    render(){
        //console.log(this.props);
        return(
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


        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    visible:PropTypes.bool,
    selectedIndex: PropTypes.number.isRequired,
    menuIsOpen: PropTypes.bool,
};
MenuItem.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    icon: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        selectedIndex: state.index,
        menuIsOpen : state.headerMenuState
    };
};

export default connect(mapStateToProps)(Header);
