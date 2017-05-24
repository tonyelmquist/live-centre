import React from "react";
import {NavLink, Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';

import FlatButton from 'material-ui/FlatButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon

import SearchBar from './../SearchBar';
import Logged from '../../containers/Logged';
import MediaQuery from 'react-responsive';

const HeaderMenu = ({pageItems, categoryItems, openCloseMenu}) => {

	const HeaderMenuItem = (items) => {
		if(items.length > 0){
			return items.map((item) =>
				<NavLink to={item.path} key={item.key}>
					<FlatButton  style={{textTransform: "none"}}
					className="menuItem links"
					label={item.key}
					/>
				</NavLink>
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

	return(

		<div className="header" >
			<FlatButton
				className="menuItem"
				label="Live Center"
				icon={<TempLogo/>}
				/>

			<MediaQuery maxWidth={1000} className="inline"  >
				<FlatButton
				className="menuItem moreButton"
				label="Menu"
				icon={<MoreIcon/>}
				onClick={()=>openCloseMenu()} 
				/>
			</MediaQuery>

			<MediaQuery minWidth={1550} className="inline">
				{HeaderMenuItem(pageItems)}
			</MediaQuery>

			<MediaQuery minWidth={1000} className="inline">
				{HeaderMenuItem(categoryItems)}
			</MediaQuery>


			<MediaQuery minWidth={1200}  className="floatRight paddingRight">
				<SearchBar/>
				<Logged />
			</MediaQuery>
			
		</div>
	);
};

export default HeaderMenu;

