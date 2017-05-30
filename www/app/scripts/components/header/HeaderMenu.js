import React from "react";
import Paper from 'material-ui/Paper';

import {Motion, spring} from 'react-motion';

import FlatButton from 'material-ui/FlatButton';

import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon

import SearchBar from './../SearchBar';
import Logged from '../../containers/Logged';
import MediaQuery from 'react-responsive';

import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';

const HeaderMenu = ({pageItems, categoryItems, openCloseMenu, isMenuOpen, locationName, isSubPage, changeRoute}) => {

	const HeaderMenuItem = (items) => {
		if(items.length > 0){
			return items.map((item) =>
					<FlatButton
					onClick={()=>changeRoute(item.path)}
					className="menuItem links"
					label={item.key}
					key={`${item.key}-flatButton`}
					/>
			);
		}		
	};

	/*
		HeaderMenuItems takes in an array of objects.
		The objects should have a key (which now is just the name) and a path. 
		The path should match the react router paths.

		This components displays different things depending on the screensize.

		< 600 px only "logo" and a menu button.
		< 640 px also a searchbar 
		< 1000 removes the menu button, and displays all the pages in the header.
			Tabmenu.js should now also display a tab of all categories.
		< 1550 the categories are now also displayed.

		This should make it easy to remove/add menu items, and choose when and what to display.
		Might be that it does not make sense to display categories. 

		the openCloseMenu() function must be passed by its parent component
		and it will open or close the expandable menu in mobile format (ExpandableMenu.js)

	*/

	/*

	<MenuButton 
	(Either hamburger or back arrow, based on state.)
	onclick will activate an animation, either 

	">

	*/

	return(

		<div className="header" >

			<MediaQuery maxWidth={1000}>
				<FlatButton
					onClick={()=>openCloseMenu()} 
		            icon={<AnimatedMenuIcon isMenuOpen={isMenuOpen} isSubPage={isSubPage}/>}
		            label={locationName} 
		          />
			</MediaQuery>

			<MediaQuery minWidth={1001} className="inline">
				{HeaderMenuItem(pageItems)}
			</MediaQuery>
			<MediaQuery minWidth={1500} className="inline">
				{HeaderMenuItem(categoryItems)}
			</MediaQuery>

			<div className="rightMenu">
				<SearchBar/>
				<Logged />
			</div>

		</div>
	);
};

export default HeaderMenu;

