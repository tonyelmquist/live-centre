import React from "react";
import {NavLink, Link} from 'react-router-dom';

import MediaQuery from 'react-responsive';
import CloseButton from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';


const ExpandableMenu = ({pageItems, categoryItems, openCloseMenu, isMenuOpen}) => {

	const MenuItems = (items) => {
		if(items.length > 0){
			return items.map((item) =>
				<NavLink to={item.path} onClick={()=>openCloseMenu()} key={item.key} >
					<p className="expandableMenuItem">
							{item.key}
					</p>
				</NavLink>
			);
		};	
	};

	return(
		<MediaQuery maxWidth={1001}>
			<div className={isMenuOpen() ? "expandableMenu" : "hidden"}>
				{MenuItems(pageItems)}
				
				<p className="divider">Categories</p>
				{MenuItems(categoryItems)}
			
			</div>
		</MediaQuery>
	);
};

export default ExpandableMenu;