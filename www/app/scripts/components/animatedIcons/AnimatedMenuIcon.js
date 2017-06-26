import React from "react";
import PropTypes from 'prop-types';

const AnimatedMenuIcon = ({isMenuOpen, isSubPage}) => {
	
const rgbaColor="rgba(0,0,0,0.7)";
//+ (isSubPage? "animMenuIcon subPage " : "animMenuIcon superPage ") //Back arrow on submenu. Removed since we placed the menu to the bottom
	return(
		<svg className={(isMenuOpen()? "animMenuIcon open " : "animMenuIcon closed ")}  height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
			<line className="top" x1="0" y1="5" x2="18" y2="5" strokeWidth="2" stroke={rgbaColor}/>
			<line className="middle" x1="0" y1="10" x2="18" y2="10" strokeWidth="2" stroke={rgbaColor}/>
			<line className="bottom" x1="0" y1="15" x2="18" y2="15" strokeWidth="2" stroke={rgbaColor}/>
		</svg>
	);
};

AnimatedMenuIcon.propTypes = {
    isMenuOpen: PropTypes.func,
    isSubPage: PropTypes.bool,
};

export default AnimatedMenuIcon;
