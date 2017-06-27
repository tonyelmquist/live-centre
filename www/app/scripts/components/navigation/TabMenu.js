import React from "react";
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MediaQuery from 'react-responsive';
import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';

const TabMenu = ({pageItems, closeSearch, changeRoute, isMenuOpen, isSubPage, openCloseMenu, hideMenu}) => {

	/*
		The tabs will only be displayed if the screensize is
		> less than 900px
	*/

	const items = pageItems;
	const listItems = items.map((item) => 
	<Tab 
	label={i18next.t(item.key)}
	onClick={() => {changeRoute(item.path); closeSearch(); hideMenu();}} 
	key={item.key} 
	icon={item.icon}/>);

	return(
		<MediaQuery maxWidth={1000}>
			<Tabs className="bottomTabs">
		          {listItems}
		          <Tab
					onClick={()=>openCloseMenu()} 
		            icon={<AnimatedMenuIcon isMenuOpen={isMenuOpen} isSubPage={isSubPage}/>}
		            label="Menu" 
		          />
			</Tabs>
		</MediaQuery>
	);
};

TabMenu.propTypes = {
	pageItems: PropTypes.array,
	changeRoute: PropTypes.func.isRequired,
	openCloseMenu: PropTypes.func,
	isMenuOpen: PropTypes.func,
	isSubPage: PropTypes.bool,
	closeSearch: PropTypes.func,
	hideMenu: PropTypes.func
};

export default TabMenu;
