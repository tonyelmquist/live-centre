import React from "react";
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import TempLogo from 'material-ui/svg-icons/hardware/videogame-asset'; //Videogame icon
import SearchBar from './SearchBar';
import SearchInput from './SearchInput';
import Logged from '../../containers/Logged';
import MediaQuery from 'react-responsive';
import TextField from 'material-ui/TextField';
import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';
import {NavLink, Link} from 'react-router-dom';

const HeaderMenu = ({pageItems, searchState, categoryItems, handleSearch, openCloseSearch, openCloseMenu, isMenuOpen, locationName, isSubPage, changeRoute, closeSearch}) => {


	const HeaderMenuItem = (items) => {
		if(items.length > 0){
			return items.map((item) =>
				
					<FlatButton
					onTouchTap={()=>{changeRoute(item.path); closeSearch();}}
					className="menuItem links"
					label={i18next.t(item.key)}
					key={`${item.key}-flatButton`}
					/>
			);
		}		
	};

	return(
		<div className="header" >

			<MediaQuery maxWidth={1000}>
	          	<div className={(searchState.isOpen)? "expandable_searchbar open" : "expandable_searchbar closed"}>
		          	<Link to='/Home'><FlatButton
						className="logo"
						label="IMR"
					/></Link>
					<SearchInput handleSearch={handleSearch} searchState={searchState}/> 
				</div>
			</MediaQuery>

			<MediaQuery minWidth={1001} className="inline">
				<FlatButton
					className="logo"
					label="IMR"
				/>
				{HeaderMenuItem(pageItems)}
			</MediaQuery>
			<MediaQuery minWidth={1500} className="inline">
				{HeaderMenuItem(categoryItems)}
			</MediaQuery>
			<div className="rightMenu">
				<SearchBar handleSearch={handleSearch} searchState={searchState} openCloseSearch={openCloseSearch}/>
				<Logged changeRoute={changeRoute}/>
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
	changeRoute: PropTypes.func,
	searchState: PropTypes.object,
	handleSearch: PropTypes.func,
	openCloseSearch: PropTypes.func
};

export default HeaderMenu;

