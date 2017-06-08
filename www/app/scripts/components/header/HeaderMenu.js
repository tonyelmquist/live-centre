import React from "react";
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

import {Motion, spring} from 'react-motion';

import FlatButton from 'material-ui/FlatButton';

import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon

import SearchBar from './../SearchBar';
import SearchInput from './SearchInput';
import Logged from '../../containers/Logged';
import MediaQuery from 'react-responsive';

import TextField from 'material-ui/TextField';

import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';

const HeaderMenu = ({pageItems, searchState, categoryItems, handleSearch, openCloseSearch, openCloseMenu, isMenuOpen, locationName, isSubPage, changeRoute}) => {

	const HeaderMenuItem = (items) => {
		if(items.length > 0){
			return items.map((item) =>
					<FlatButton
					onTouchTap={()=>changeRoute(item.path)}
					className="menuItem links"
					label={item.key}
					key={`${item.key}-flatButton`}
					/>
			);
		}		
	};

	return(
		<div className="header" >

			<MediaQuery maxWidth={1000}>
	          	<div className={(searchState().isOpen)? "mobile_searchbar open" : "mobile_searchbar closed"}>
		          	<FlatButton
						className="logo"
						label="IMR"
					/>
					<SearchInput handleSearch={handleSearch} searchState={searchState}/> 
				</div>
			</MediaQuery>

			<MediaQuery minWidth={1001} className="inline">
				{HeaderMenuItem(pageItems)}
			</MediaQuery>
			<MediaQuery minWidth={1500} className="inline">
				{HeaderMenuItem(categoryItems)}
			</MediaQuery>
			<div className="rightMenu">
				<SearchBar searchState={searchState} openCloseSearch={openCloseSearch}/>
				<Logged />
			</div>

		</div>
	);
};

HeaderMenu.propTypes = {
    pageItems : PropTypes.array.isRequired,
    categoryItems : PropTypes.array.isRequired,
	openCloseMenu: PropTypes.func,
	isMenuOpen: PropTypes.func,
	locationName: PropTypes.string,
	isSubPage: PropTypes.bool,
	changeRoute: PropTypes.func
};

export default HeaderMenu;

