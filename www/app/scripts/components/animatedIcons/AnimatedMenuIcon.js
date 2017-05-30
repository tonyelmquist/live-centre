import React from "react";
import PropTypes from 'prop-types';

const AnimatedMenuIcon = ({isMenuOpen, isSubPage}) => {

	return(
		<svg className={"animMenuIcon " + (isMenuOpen()? "open " : "closed ") + (isSubPage? "subPage " : "superPage ")}  height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
			<line className="top" x1="0" y1="5" x2="18" y2="5" strokeWidth="3" stroke="white"/>
			<line className="middle" x1="0" y1="10" x2="18" y2="10" strokeWidth="3" stroke="white"/>
			<line className="bottom" x1="0" y1="15" x2="18" y2="15" strokeWidth="3" stroke="white"/>
		</svg>
	);
};
/*
AnimatedMenuIcon.propTypes = {
    isMenuOpen: PropTypes.function,
    isSubPage: PropTypes.string,
};*/

export default AnimatedMenuIcon;
