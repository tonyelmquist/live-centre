import React from 'react';
import PropTypes from 'prop-types';

const AnimatedMenuCrossIcon = ({ isMenuOpen }) => {
    const rgbaColor = 'rgba(0,0,0,0.7)';
    // + (isSubPage? "animMenuIcon subPage " : "animMenuIcon superPage ")
    // Back arrow on submenu. Removed since we placed the menu to the bottom
    return (
      <svg className={`animMenuCrossIcon ${isMenuOpen() ? 'isOpen' : ''}`} height="20" viewBox="0 0 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
        <line className="top" x1="1" y1="1" x2="20" y2="20" strokeWidth="2" stroke={rgbaColor} />
        <line className="bottom" x1="20" y1="1" x2="1" y2="20" strokeWidth="2" stroke={rgbaColor} />
      </svg>
    );
};

AnimatedMenuCrossIcon.propTypes = {
    isMenuOpen: PropTypes.func.isRequired,
    // isSubPage: PropTypes.bool,
};

export default AnimatedMenuCrossIcon;
