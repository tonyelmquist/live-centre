import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logged from './Logged';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//MaterialUI
import SearchBar from '../components/SearchBar';
import Paper from 'material-ui/Paper';

import {changeNavMenuIndex} from '../actions/bottomNavMenu';

//MaterialUI
import HomeIcon from 'material-ui/svg-icons/action/home';
import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';


import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  header: {
    padding: '0 40px',
    borderBottom: 'solid 1px #fff',
    width:'100%',
    overflow: 'auto',
    backgroundColor: '#000',
    color: '#fff',
  },
  menuItem: {
    margin: '25px 10px 35px 10px',
    display:'inline-block',
    verticalAlign: 'middle',
  },
  menu:{
    display: 'inline-block',
  },
  rightSide: {
    float: 'right',
    paddingRight: '40px',
  },
  leftSide : {
    float:'left',
  }

};



class Header extends React.Component {
    constructor(){
        super();
    }

    select = (index) => this.props.dispatch(changeNavMenuIndex(index));

    render(){
        return(

        <Paper zDepth={1}  id="header" style={styles.header}>
              <FlatButton
                onTouchTap={() => this.select(0)}
                target="_blank"
                label="Live Centre"
                primary={true}
                style={styles.menuItem} 
                icon={<TempLogo/>}
              />
              <FlatButton
                onTouchTap={() => this.select(0)}
                target="_blank"
                label="Home"
                secondary={true}
                style={styles.menuItem} 
                icon={<HomeIcon/>}
              />
              <FlatButton
                onTouchTap={() => this.select(1)}
                target="_blank"
                label="Settings"
                secondary={true}
                style={styles.menuItem} 
                icon={<SettingsIcon/>}
              />
              <FlatButton
                onTouchTap={() => this.select(2)}
                target="_blank"
                label="Favorites"
                secondary={true}
                style={styles.menuItem} 
                icon={<FavoriteIcon/>}
              />

              <FlatButton
                onTouchTap={() => this.select(3)}
                target="_blank"
                label="Category 1"
                secondary={true}
                style={styles.menuItem} 
              />
 
         
          <div style={styles.rightSide} >
              <SearchBar/>
              
              <IconButton>
                <Logged />
              </IconButton>

          </div>

        </Paper>


            
        );
    }
}
Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    visible:PropTypes.bool,
    selectedIndex: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        visible: state.navMenu.isVisible,
        selectedIndex: state.navMenu.index
    };
};

export default connect(mapStateToProps)(Header);
