/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import {showSidebar, hideSidebar} from '../actions/sidebar';

class Sidebar extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = {open: false};
  // }

  // handleToggle = () => this.props.handleDrawer(true);

  handleClose = () => this.props.dispatch(hideSidebar());
  handleShow = () => this.props.dispatch(showSidebar());

  render() {
    return (
      <div>
        <Drawer
            docked={false}
            width={200}
            open={this.props.sidebarState}
        >
            <List>
                <ListItem
                  disabled={true}
                  leftAvatar={
                    <Avatar src="img/avatar.png" />
                  }
                >
                  Image Avatar
                </ListItem>

            </List>
            <MenuItem>Menu Item</MenuItem>
            <Divider />
            <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        sidebarState: state.isSidebarVisible
    };
};

export default connect(mapStateToProps)(Sidebar);;
