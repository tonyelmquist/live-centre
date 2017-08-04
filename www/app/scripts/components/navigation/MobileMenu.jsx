import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

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

    render() {
        const indicatorStyle = {
            width: `${100 / this.props.menuItems.length}%`,
            left: `${(100 / this.props.menuItems.length) * this.state.active}%`,
            background: this.props.indicatorColor,
            height: `${this.props.indicatorHeight}px`,
        };

        return (
            <div className="mobile-menu">
                <div className="mobile-menu-items">
                    {this.props.menuItems.map((value, id) =>
                        (<a key={`mobile-menu-${value.key}`} className={`mobile-menu-item ${value.key.length <= 0 ? 'icon-only ' : ' '}${value.key}`} onClick={() => this.onClick(value, id)} tabIndex="0" role="link">
                            {value.icon}
                            {value.key.length > 0 ? <span className="mobile-menu-item-text">{i18next.t(value.key)}</span> : ''}
                        </a>),
                    )}
                </div>
                <div className="mobile-menu-indicator" style={indicatorStyle} />
            </div>
        );
    }
}

MobileMenu.defaultProps = {
    indicatorColor: 'rgb(144, 202, 249)',
    indicatorHeight: 4,
};

MobileMenu.propTypes = {
    menuItems: PropTypes.array.isRequired,
    indicatorColor: PropTypes.string,
    indicatorHeight: PropTypes.bool,
};

export default MobileMenu;
