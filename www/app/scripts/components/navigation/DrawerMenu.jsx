import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DrawerMenu extends Component {
    render() {
        return (
            <div className={`drawer-menu-container `}>
                <nav className={`drawer-menu ${this.props.isOpen ? 'isOpen' : ''}`}>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

DrawerMenu.defaultProps = {
    isOpen: false,
}

DrawerMenu.propTypes = {
    isOpen: PropTypes.bool,
};

export default DrawerMenu;