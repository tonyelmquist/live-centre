import React from "react";
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MediaQuery from 'react-responsive';
import AnimatedMenuIcon from './../animatedIcons/AnimatedMenuIcon';

const TabMenu = ({pageItems, changeRoute, isMenuOpen, isSubPage, openCloseMenu}) => {

				/*
		For now we recieve categoryitems, this could be changed if other links
		will be of better fit.

		The tabs will only be displayed if the screensize is
		> less than 900px
	*/

	const items = pageItems;
	const listItems = items.map((item) => <Tab label={item.key} onClick={() => changeRoute(item.path)} key={item.key} icon={item.icon}/>);

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
	changeRoute: PropTypes.func.isRequired
};

export default TabMenu;
