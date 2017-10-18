import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import MediaQuery from 'react-responsive';
import AnimatedMenuCrossIcon from '../../components/Icons/AnimatedMenuCrossIcon';

class MobileMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 0,
        };
    }

    onClick = (value, id) => {
        if (id !== 2) {
            this.setState({ active: id });
        }
        value.onClick();
    }

    addCenterMenu = (menuItems) => {
        const newMenuItems = menuItems.slice();
        newMenuItems.splice(2, 0,
            {
                key: '',
                onClick: () => this.props.openCloseMenu(),
                icon: <AnimatedMenuCrossIcon isMenuOpen={() => this.props.menuIsOpen} />,
            });
        return newMenuItems;
    }

    render() {
        const indicatorStyle = {
            width: `${100 / (this.props.menuItems.length + 1)}%`,
            left: `${(100 / (this.props.menuItems.length + 1)) * this.props.activeItem}%`,
            background: this.props.indicatorColor,
            height: `${this.props.indicatorHeight}px`,
        };

        const containerStyle = {
            opacity: this.props.searchState.isFocused && this.props.searchState.isOpen ? 0 : 1,
        };

        return (
            <MediaQuery maxWidth={1000}>
                <div className="mobile-menu" style={containerStyle}>
                    <div className="mobile-menu-items">
                        {this.addCenterMenu(this.props.menuItems).map((value, id) =>
                            (<a key={`mobile-menu-${value.key}`} className={`mobile-menu-item ${value.key.length <= 0 ? 'icon-only ' : ' '}${value.key}`} onTouchTap={() => this.onClick(value, id)} tabIndex="0" role="link">
                                {value.icon}
                                {value.key.length > 0 ? <span className="mobile-menu-item-text">{i18next.t(value.key)}</span> : ''}
                            </a>),
                        )}
                    </div>
                    <div className="mobile-menu-indicator" style={indicatorStyle} />
                </div>
            </MediaQuery>
        );
    }
}

MobileMenu.defaultProps = {
    indicatorColor: 'rgb(144, 202, 249)',
    indicatorHeight: 4,
    activeItem: 0,
};

MobileMenu.propTypes = {
    openCloseMenu: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
    indicatorColor: PropTypes.string,
    indicatorHeight: PropTypes.number,
    searchState: PropTypes.object.isRequired,
    activeItem: PropTypes.number,
    menuIsOpen: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]).isRequired,
};

export default MobileMenu;
