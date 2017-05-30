import React from "react";
import {NavLink, Link} from 'react-router-dom';

import MediaQuery from 'react-responsive';
import CloseButton from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {Motion, spring} from 'react-motion';

const ExpandableMenu = ({pageItems, categoryItems, openCloseMenu, isMenuOpen, changeRoute}) => {

	const MenuItems = (items) => {
		if(items.length > 0){
			return items.map((item) =>
				
					<p onClick={()=>{changeRoute(item.path); openCloseMenu();}} className="expandableMenuItem">
							{item.key}
					</p>
			);
		};	
	};

	return(
		<MediaQuery maxWidth={1001}>

			<Motion defaultStyle={{x:0}} style={{x:isMenuOpen()? spring(100) : spring(0)}}>

				{
					value=>
					<div className="expandableMenu"
					style={{height: `${value.x}%`}}
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

export default ExpandableMenu;