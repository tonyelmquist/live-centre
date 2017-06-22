import React from "react";
import {NavLink, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import CloseButton from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {Motion, spring} from 'react-motion';

const ExpandableMenu = ({pageItems, categoryItems, openCloseMenu, isMenuOpen, changeRoute}) => {

	const MenuItems = (items) => {
		if(items.length > 0){
			return items.map((item) =>
			
					<p key={item.key} onTouchTap={()=>{changeRoute(item.path); openCloseMenu(); }} className="expandableMenuItem">

							{i18next.t(item.key)}
					</p>
			);
		};
	};

	const _style = (isOpen) => {
		if(isOpen){
			return { 
				x: spring(0), 
				y: spring(100),
				o: spring(1),
			};
		} else{
			return{
				x: spring(100),
				y: spring(0),
				o: spring(0),
			};
		}
	};

	return(
		<MediaQuery maxWidth={1001}>

			<Motion defaultStyle={{x:0, y:100, o:0}} style={_style(isMenuOpen())}>

				{
					(value) =>
					<div className="expandableMenu"
					style={{
						top: `${value.x}%`,
						width: `${value.y}%`,
						opacity: value.o
						}}
					>
					<p className="divider">Menu</p>
					<div className="expandableMenuInner">
					{MenuItems(pageItems)}

					<p className="divider">Categories</p>
					{MenuItems(categoryItems)}
					</div>
					</div>
				}


			</Motion>
		</MediaQuery>
	);
};

ExpandableMenu.propTypes = {
    pageItems : PropTypes.array.isRequired,
    categoryItems : PropTypes.array.isRequired,
	openCloseMenu: PropTypes.func,
	isMenuOpen: PropTypes.func,
	changeRoute: PropTypes.func
};

export default ExpandableMenu;
