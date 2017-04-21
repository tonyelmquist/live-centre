import React, {Component} from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSetting from 'material-ui/svg-icons/action/settings';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const favoritesIcon = <ActionFavorite />;
const homeIcon = <ActionHome />;
const settingsIcon = <ActionSetting />;


//Actions
import {changeNavMenuIndex} from '../actions/bottomNavMenu';


class BottomNavMenu extends Component {

  select = (index) => this.props.dispatch(changeNavMenuIndex(index));

  render() {
    
    return (
      <Paper zDepth={2} style={{position: 'fixed',bottom: 0, width: '100%'}} >
        <BottomNavigation selectedIndex={this.props.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Settings"
            icon={settingsIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        visible: state.navMenu.isVisible,
        selectedIndex: state.navMenu.index
    };
};

export default connect(mapStateToProps)(BottomNavMenu);
